
export function cotizacionPDF()  
{

    const doc = new jsPDF('p', 'mm', 'a4');
console.log(doc.getFontList());

var imatxt = new XMLHttpRequest()
var rutaimagen = 'fondocotizacion.txt'
imatxt.open('GET', rutaimagen, false)
imatxt.send(null)
var myimagen = imatxt.responseText
console.log(myimagen.toString);
doc.addImage(myimagen, 'PNG', 0, 0, 210, 305)
doc.setFontSize(12)
doc.text("Luis Rolando Colop Tzoc", 58, 82)
doc.text("920192-2", 30, 89)
doc.text("Marvin Tzul", 42, 95)

/*
doc.setFont('helvetica', 'bold')
doc.text("F:__________________________________", 65, 100)
doc.setFont('helvetica', 'bold')
doc.text("Firma del director del centro educativo", 69, 105)
*/





doc.save(`Contrato.pdf`)
}
