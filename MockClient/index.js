// const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMDRmMTMyMC1jNjczLTRhNjYtYjE5ZS1mMWE0N2ZkZDY4ZGYiLCJlbWFpbCI6ImxzQGdtYWkuY2xvIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE3MTMwODYwMTgsImV4cCI6MTcxMzA4OTYxOH0.IEJ1P7cmFDEfJi0u5pkr6SdRZAIQvMIiqbyOo2F5y9Y';

// fetch('http://localhost:3000/users/profile', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//     },
// })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

const batch = {
    status: 'success',
    placer_name: 'Tu',
    placer_CID: 'CID1234567890',
    placer_phone: '1234567890',
    import_date: new Date(),
    total_type: 10,
    medicines: [
        {
            name: '5345',
            age: 22,
        },
        {
            name: 'Tu',
            age: 20,
        },
    ],
    description: 'no thing',
};

console.log(JSON.stringify(batch));

fetch('http://localhost:3000/medicine', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(batch),
})
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
