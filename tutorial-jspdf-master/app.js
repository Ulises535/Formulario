function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let curso = document.getElementById('curso').value;
        let nombres = document.getElementById('nombre').value;
        let apellidos = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let direccion = document.getElementById('direccion').value;
        let telefono = document.getElementById('telefono').value;
        let hijos = document.querySelector('input[name="hijos"]:checked').value;
        let numeroHijos = document.getElementById('numeroHijos').value;
        let discapacidad = document.querySelector('input[name="discapacidad"]:checked').value;
        let discapacidadDesc = document.getElementById('discapacidad-desc').value;

        generatePDF(curso, nombres, apellidos, email, direccion, telefono, hijos, numeroHijos, discapacidad, discapacidadDesc);
    })

});

async function generatePDF(curso, nombres, apellidos, email, direccion, telefono, hijos, numeroHijos, discapacidad, discapacidadDesc) {
    const image = await loadImage("formulario.jpg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');




    pdf.save("example.pdf");

}