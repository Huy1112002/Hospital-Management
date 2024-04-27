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
            quantity: 300,
            cost_in: 220,
            expire: setExpire(now, 60),
            vendor: 'VN',
        },
        {
            medicine_id: 'T3',
            quantity: 200,
            cost_in: 10,
            expire: setExpire(now, 60),
            vendor: 'USA',
        },
    ],
    description: 'Đã kiểm tra',
};

const amount = { amount: 150 };

const newCost = { cost: 450 };

const medicine = {
    medicine_id: 'T4',
    cost_out: 350,
    name: 'Vitamin B12',
    unit: 'ml',
    ingredients: ['C63H90O14PCo'],
    description:
        'Giúp hình thành tế bào hồng cầu và phòng chống thiếu máu. Vitamin B12 đóng một vai trò quan trọng trong việc giúp cơ thể sản xuất các tế bào hồng cầu.',
};

const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YmM0MWY5NS1mYTlkLTRiNjAtOGYwMy02MTQ4ODdhNDQzNjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxMzY2OTAxMiwiZXhwIjoxNzEzNjcyNjEyfQ.6C-KjQdaALAIOMxUTEanapYm-t4-qSuGKb8UsEfmOOk';

fetch('https://helped-alpaca-obliging.ngrok-free.app/medicine', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: token,
    },
    // body: JSON.stringify(batch),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
