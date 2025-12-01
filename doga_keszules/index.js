/**
 * @type {{place:string, what1:string, example1:string, what2?:string, example2?:string}[]}
 */
const data = [
    {
        place: "Athén",
        what1: "politika",
        example1: "demokrácia",
        what2: "tudomány",
        example2: "filozófia"
    },
    {
        place: "Egyiptom",
        what1: "mezőgazdaság",
        example1: "csatornák"
    },
    {
        place: "Spárta",
        what1: "neveléstudomány",
        example1: "agogé",
        what2: "harcászat",
        example2: "hoplita"
    }
];

const jsSection = document.getElementById("jssection");

const jsTable = document.createElement("table");
jsSection.appendChild(jsTable);

const jsThead = document.createElement("thead");
jsTable.appendChild(jsThead);

const jsHeadRow = document.createElement("tr");
jsThead.appendChild(jsHeadRow);

const headers = ["Ókori település", "Ágazat", "Példa"];

for (const header of headers) {
    const th = document.createElement("th");
    th.textContent = header;
    jsHeadRow.appendChild(th);
}

const jsTbody = document.createElement("tbody");
jsTbody.id = "jstbody";
jsTable.appendChild(jsTbody);

for (const item of data) {
    const tr1 = document.createElement("tr");
    jsTbody.appendChild(tr1);

    const tdPlace = document.createElement("td");
    tdPlace.textContent = item.place;
    tr1.appendChild(tdPlace);

    const tdWhat1 = document.createElement("td");
    tdWhat1.textContent = item.what1;
    tr1.appendChild(tdWhat1);

    const tdExample1 = document.createElement("td");
    tdExample1.textContent = item.example1;
    tr1.appendChild(tdExample1);

    if (item.what2 && item.example2) {
        tdPlace.rowSpan = 2;

        const tr2 = document.createElement("tr");
        jsTbody.appendChild(tr2);

        const tdWhat2 = document.createElement("td");
        tdWhat2.textContent = item.what2;
        tr2.appendChild(tdWhat2);

        const tdExample2 = document.createElement("td");
        tdExample2.textContent = item.example2;
        tr2.appendChild(tdExample2);
    }
}

function updateTableVisibility(isChecked) {
    const htmlSection = document.getElementById("htmlsection");
    const jsSectionDiv = document.getElementById("jssection");

    if (isChecked) {
        htmlSection.classList.add("hide");
        jsSectionDiv.classList.remove("hide");
    } else {
        jsSectionDiv.classList.add("hide");
        htmlSection.classList.remove("hide");
    }
}

function initTableSelector() {
    const checkbox = document.getElementById("tableselector");
    updateTableVisibility(checkbox.checked);

    checkbox.addEventListener("change", function (event) {
        updateTableVisibility(event.target.checked);
    });
}

function createJsForm() {
    const form = document.createElement("form");
    form.id = "jsform";
    jsSection.appendChild(form);

    const fields = [
        {label: "Ókori település", id: "elso", name: "telepules", required: true},
        {label: "Ágazat1", id: "masodik", name: "agazat1", required: true},
        {label: "Példa1", id: "harmadik",name: "pelda1", required: true},
        {label: "Ágazat2", id: "negyedik",name: "agazat2", required: false},
        {label: "Példa2", id: "otodik",  name: "pelda2", required: false}
    ];

    for (const field of fields) {
        const div = document.createElement("div");
        form.appendChild(div);

        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label;
        div.appendChild(label);

        div.appendChild(document.createElement("br"));

        const input = document.createElement("input");
        input.id = field.id;
        input.name = field.name;
        input.type = "text";
        div.appendChild(input);

        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error");
        div.appendChild(errorSpan);
    }

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Hozzáadás";
    form.appendChild(button);

    initJsFormHandler(form);
}

function initHtmlFormHandler() {
    const form = document.getElementById("htmlform");
    const tbody = document.getElementById("htmltbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const target = event.target;

        const inputPlace = target.querySelector("#elso");
        const inputSector = target.querySelector("#masodik");
        const inputEx1 = target.querySelector("#harmadik");
        const inputEx2 = target.querySelector("#negyedik");

        const requiredInputs = [inputPlace, inputSector, inputEx1];
        let hasError = false;

        for (const input of requiredInputs) {
            const parentDiv = input.parentElement;
            const errorSpan = parentDiv.querySelector(".error");

            if (input.value.trim() === "") {
                errorSpan.textContent = "A mező kitöltése kötelező";
                hasError = true;
            } else {
                errorSpan.textContent = "";
            }
        }

        if (hasError) {
            return;
        }

        const valuePlace = inputPlace.value.trim();
        const valueSector = inputSector.value.trim();
        const valueEx1 = inputEx1.value.trim();
        const valueEx2 = inputEx2.value.trim();

        const obj = {
            place: valuePlace,
            what1: valueSector,
            example1: valueEx1
        };

        if (valueEx2 !== "") {
            obj.example2 = valueEx2;
        }

        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const tdPlace = document.createElement("td");
        tdPlace.textContent = obj.place;
        tr.appendChild(tdPlace);

        const tdSector = document.createElement("td");
        tdSector.textContent = obj.what1;
        tr.appendChild(tdSector);

        const tdEx1 = document.createElement("td");
        tdEx1.textContent = obj.example1;
        tr.appendChild(tdEx1);

        if (obj.example2) {
            const tdEx2 = document.createElement("td");
            tdEx2.textContent = obj.example2;
            tr.appendChild(tdEx2);
        } else {
            tdEx1.colSpan = 2;
        }

        form.reset();
    });
}

function initJsFormHandler(form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const target = event.target;

        const inputPlace = target.querySelector("#elso");
        const inputAg1 = target.querySelector("#masodik");
        const inputEx1 = target.querySelector("#harmadik");
        const inputAg2 = target.querySelector("#negyedik");
        const inputEx2 = target.querySelector("#otodik");

        const requiredInputs = [inputPlace, inputAg1, inputEx1];
        let hasError = false;

        for (const input of requiredInputs) {
            const parentDiv = input.parentElement;
            const errorSpan = parentDiv.querySelector(".error");

            if (input.value.trim() === "") {
                errorSpan.textContent = "A mező kitöltése kötelező";
                hasError = true;
            } else {
                errorSpan.textContent = "";
            }
        }

        if (hasError) {
            return;
        }

        const valuePlace = inputPlace.value.trim();
        const valueAg1 = inputAg1.value.trim();
        const valueEx1 = inputEx1.value.trim();
        const valueAg2 = inputAg2.value.trim();
        const valueEx2 = inputEx2.value.trim();

        const obj = {
            place: valuePlace,
            what1: valueAg1,
            example1: valueEx1
        };

        if (valueAg2 !== "" && valueEx2 !== "") {
            obj.what2 = valueAg2;
            obj.example2 = valueEx2;
        }

        data.push(obj);

        const tbody = document.getElementById("jstbody");
        tbody.textContent = "";

        for (const item of data) {
            const tr1 = document.createElement("tr");
            tbody.appendChild(tr1);

            const tdPlace = document.createElement("td");
            tdPlace.textContent = item.place;
            tr1.appendChild(tdPlace);

            const tdWhat1 = document.createElement("td");
            tdWhat1.textContent = item.what1;
            tr1.appendChild(tdWhat1);

            const tdExample1 = document.createElement("td");
            tdExample1.textContent = item.example1;
            tr1.appendChild(tdExample1);

            if (item.what2 && item.example2) {
                tdPlace.rowSpan = 2;

                const tr2 = document.createElement("tr");
                tbody.appendChild(tr2);

                const tdWhat2 = document.createElement("td");
                tdWhat2.textContent = item.what2;
                tr2.appendChild(tdWhat2);

                const tdExample2 = document.createElement("td");
                tdExample2.textContent = item.example2;
                tr2.appendChild(tdExample2);
            }
        }

        target.reset();
    });
}

createJsForm();
initTableSelector();
initHtmlFormHandler();