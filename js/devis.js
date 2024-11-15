function generateInvoice(cart) {
    // to create new PDF document
    const doc = new jspdf.jsPDF();


    doc.addImage('../assets/icon/logo.png', 'PNG', 5, 5, 37, 25);
    doc.setFontSize(28);
    doc.text('INVOICE', 15, 55, { align: 'left' });

    doc.setFontSize(10);
    doc.text([
        'From:',
        'Stylefox',
        'Mountain View,',
        'CA 94043',
        'www.stylefox.com',
        'noreply@stylefox.com',
        '+1(038) 248-4617'
    ], 15, 70);

    doc.text([
        'To:',
        'Client',
        'Safi, Morocco.',
        'YCA1',
        'youcode@client.com'
    ], 120, 70);

    // Add invoice details
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    // Creating table data
    const tableColumn = ["Item", "Qty", "Unit Price", "Subtotal"];
    const tableRows = cart.map(item => [
        item.name + (item.size ? ` (${item.size})` : ''),
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    // Add items table
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [0, 0, 0] }
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * 0.1;
    const total = subtotal - discount;

    // Add totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Net Subtotal: $${subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });
    doc.text(`Discount (10%): -$${discount.toFixed(2)}`, 190, finalY + 7, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`Total (USD): $${total.toFixed(2)}`, 190, finalY + 14, { align: 'right' });

    // Save the PDF
    doc.save(`invoice-${invoiceNumber}.pdf`);
}

window.generateInvoice = generateInvoice;

// fin de devis