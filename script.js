// 🧮 KALKULYATOR
function hisobla() {
    let son1 = Number(document.getElementById("son1").value);
    let son2 = Number(document.getElementById("son2").value);
    let amal = document.getElementById("amal").value;

    let natija;

    if (
        document.getElementById("son1").value === "" ||
        document.getElementById("son2").value === ""
    ) {
        natija = "Sonlarni kiriting!";
    }

    else if (amal === "+") {
        natija = son1 + son2;
    }

    else if (amal === "-") {
        natija = son1 - son2;
    }

    else if (amal === "*") {
        natija = son1 * son2;
    }

    else if (amal === "/") {

        if (son2 === 0) {
            natija = "0 ga bo‘lish mumkin emas!";
        } else {
            natija = son1 / son2;
        }
    }

    document.getElementById("natija").textContent = natija;
}


// 🔄 KONVERTOR
function konvertor() {

    let input = document.getElementById("miqdor");
    let miqdor = Number(input.value);

    let birlik = document.getElementById("birlik").value;

    let natija;

    if (input.value === "") {
        natija = "Miqdorni kiriting!";
    }

    else if (birlik === "gbmb") {
        natija = (miqdor * 1024) + " MB";
    }

    else if (birlik === "mbgb") {
        natija = (miqdor / 1024).toFixed(2) + " GB";
    }

    else if (birlik === "kggram") {
        natija = (miqdor * 1000) + " g";
    }

    else if (birlik === "gramkg") {
        natija = (miqdor / 1000).toFixed(2) + " kg";
    }

    document.getElementById("konvertorNatija").textContent = natija;
}


// 🎂 YOSH HISOBLAGICH
function yoshHisobla() {

    let sana = document.getElementById("tugilganSana").value;

    let natijaElement =
        document.getElementById("yoshNatija");

    if (sana === "") {
        natijaElement.textContent =
            "Tug‘ilgan sanani tanlang!";
        return;
    }

    let tugilgan = new Date(sana);
    let bugun = new Date();

    if (tugilgan > bugun) {
        natijaElement.textContent =
            "Kelajak sanasini tanlash mumkin emas!";
        return;
    }

    let yosh =
        bugun.getFullYear() -
        tugilgan.getFullYear();

    let oy =
        bugun.getMonth() -
        tugilgan.getMonth();

    if (
        oy < 0 ||
        (
            oy === 0 &&
            bugun.getDate() < tugilgan.getDate()
        )
    ) {
        yosh--;
    }

    natijaElement.textContent =
        yosh + " yosh";
}


// 🔐 PAROL GENERATOR
function parolYarat() {

    let uzunlik = Number(
        document.getElementById("parolUzunligi").value
    );

    if (uzunlik < 6 || uzunlik > 30) {

        document.getElementById("parolNatija").value =
            "6–30 oralig‘ida kiriting!";

        return;
    }

    let belgilar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*";

    let parol = "";

    for (let i = 0; i < uzunlik; i++) {

        let index =
            Math.floor(
                Math.random() * belgilar.length
            );

        parol += belgilar[index];
    }

    document.getElementById("parolNatija").value =
        parol;
}

// 🌙 DARK MODE
function darkMode() {
    document.body.classList.toggle("dark");

    let button = document.querySelector(".theme-btn");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
}


function parolNusxala() {

    let parol = document.getElementById("parolNatija").value;

    if (parol === "") {
        alert("Avval parol yarating!");
        return;
    }

    navigator.clipboard.writeText(parol);

    alert("✅ Parol nusxalandi!");
}

// FOIZ HISOBLAGICH
function foizHisobla() {

    const son = Number(document.getElementById("foizSon").value);
    const foiz = Number(document.getElementById("foizMiqdor").value);
    const natija = document.getElementById("foizNatija");

    if (isNaN(son) || isNaN(foiz) || son === 0 && foiz === 0) {
        natija.textContent = "Qiymat kiriting";
        return;
    }

    const hisob = (son * foiz) / 100;

    natija.textContent = hisob;
}
 // 💰 AVTOMATIK VALYUTA KONVERTORI
async function valyutaHisobla() {

    const miqdorInput =
        document.getElementById("valyutaMiqdor");

    const from =
        document.getElementById("valyutaFrom").value;

    const to =
        document.getElementById("valyutaTo").value;

    const natija =
        document.getElementById("valyutaNatija");

    const miqdor = Number(miqdorInput.value);

    if (miqdorInput.value === "" || miqdor < 0) {
        natija.textContent = "Miqdorni kiriting!";
        return;
    }

    if (from === to) {

        natija.textContent =
            miqdor.toLocaleString("uz-UZ", {
                maximumFractionDigits: 2
            }) + " " + to;

        return;
    }

    natija.textContent = "⏳ Kurs olinmoqda...";

    try {

        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );

        if (!response.ok) {
            throw new Error("Kurs topilmadi");
        }

        const data = await response.json();

        const hisob = miqdor * data.rate;

        natija.textContent =
            hisob.toLocaleString("uz-UZ", {
                maximumFractionDigits: 2
            }) + " " + to;

    } catch (error) {

        console.error(error);

        natija.textContent =
            "❌ Kursni olishda xatolik!";
    }
}


// 🔍 VALYUTA QIDIRUV
function valyutaQidir(searchId, selectId) {

    const search =
        document.getElementById(searchId)
            .value
            .toLowerCase()
            .trim();

    const select =
        document.getElementById(selectId);

    const options =
        select.querySelectorAll("option");

    options.forEach(option => {

        const text =
            option.textContent.toLowerCase();

        const value =
            option.value.toLowerCase();

        option.hidden =
            !text.includes(search) &&
            !value.includes(search);

    });
}


// 🔄 VALYUTANI ALMASHTIRISH
function valyutaAlmashtir() {

    const from =
        document.getElementById("valyutaFrom");

    const to =
        document.getElementById("valyutaTo");

    const fromSearch =
        document.getElementById("fromSearch");

    const toSearch =
        document.getElementById("toSearch");

    const vaqtincha =
        from.value;

    from.value = to.value;
    to.value = vaqtincha;

    fromSearch.value = "";
    toSearch.value = "";

    valyutaQidir("fromSearch", "valyutaFrom");
    valyutaQidir("toSearch", "valyutaTo");
}