function setExpire(now, day_offset = 0) {
    const round = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24);
    return new Date(round + day_offset * (1000 * 60 * 60 * 24));
}

const now = new Date();

const batch = {
    status: 'success',
    placer_name: 'Nguyễn Văn ABCD',
    placer_CID: '404 Not Found',
    placer_phone: '0978123456',
    import_date: setExpire(now),
    medicines: [
        {
            medicine_id: 'T2',
            quantity: 150,
            cost_in: 220,
            expire: setExpire(now, 60),
            vendor: 'VN',
        },
        {
            medicine_id: 'T3',
            quantity: 200,
            cost_in: 10,
            expire: setExpire(now, 365),
            vendor: 'USA',
        },
        {
            medicine_id: 'T2',
            quantity: 150,
            cost_in: 250,
            expire: setExpire(now, 60),
            vendor: 'JAPAN',
        },
    ],
    description: 'Đã kiểm tra',
};

const amount = { amount: 50 };

const newCost = { cost: 450 };

const medicine = {
    medicine_id: 'T5',
    cost_out: 350,
    name: 'Vitamin E',
    unit: 'ml',
    ingredients: ['Tocopherol', 'Tocotrienol'],
    description:
        'Vitamin E là một thành phần quan trọng giúp duy trì hoạt động bình thường của các cơ quan trong cơ thể là một chất chống oxy hóa giúp làm chậm các quá trình gây tổn thương tế bào.',
};

fetch('http://localhost:3000/medicine/cost/T4', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCost),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
