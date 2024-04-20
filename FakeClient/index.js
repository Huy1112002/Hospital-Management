const batch = {
    status: 'success',
    placer_name: 'Nguyen Van A',
    placer_CID: '404',
    placer_phone: '0999999990',
    import_date: new Date(),
    medicines: [
        {
            medicine_id: 'T1',
            quantity: 10,
            costIn: 70,
            expire: new Date(),
            vendor: 'USA',
        },
        {
            medicine_id: 'T2',
            quantity: 10,
            costIn: 90,
            expire: new Date(),
            vendor: 'CHINA',
        },
        {
            medicine_id: 'T1',
            quantity: 15,
            costIn: 60,
            expire: new Date(),
            vendor: 'USA',
        },
        {
            medicine_id: 'T3',
            quantity: 30,
            costIn: 200,
            expire: new Date(),
            vendor: 'VN',
        },
        {
            medicine_id: 'T4',
            quantity: 30,
            costIn: 200,
            expire: new Date(),
            vendor: 'VN',
        },
    ],
    description: 'da kiem tra',
};

const amount = { amount: 200 };

const newCost = { cost: 166 };

const medicine = {
    medicine_id: 'T2',
    costOut: 50,
    name: 'Vitamin B',
    unit: 'ml',
    ingredients: ["I don't know B"],
};

fetch('http://localhost:3000/medicine/use/T3', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(amount),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
