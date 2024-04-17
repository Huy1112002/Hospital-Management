const batch = {
    status: 'da nhap',
    placer_name: 'USA',
    placer_CID: '444',
    placer_phone: '0999999990',
    import_date: new Date(),
    medicines: [
        {
            medicine_id: 'T1',
            quantity: 10,
            costIn: 50,
            expire: new Date(),
            vendor: 'huymai',
        },
    ],
    description: 'string',
};

const amount = {amount: 15};

const medicine = {
    medicine_id: 'T1',
    costOut: 50,
    name: 'vacxin',
    unit: 'ml',
    ingredients: ['covid', 'blood', 'viruss'],
};

fetch('http://localhost:3000/medicine/T1', {
    method: 'PATCH',
    headers: {
        
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(amount),
})
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
