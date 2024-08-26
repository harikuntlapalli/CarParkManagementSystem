document.addEventListener('DOMContentLoaded', () => {
    const carList = document.getElementById('car-table-body');
    const form = document.getElementById('add-car-form');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');

    let editMode = false;
    let currentCarId = null;

    // Fetch cars and display in the table
    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cars');
            const cars = await response.json();
            carList.innerHTML = '';
            cars.forEach(car => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${car.employeeName}</td>
                    <td>${car.carRegistrationNumber}</td>
                    <td>${car.carMake}</td>
                    <td>${car.carModel}</td>
                    <td>${car.colour}</td>
                    <td>${car.year}</td>
                    <td>${car.isApproved ? 'Approved' : 'Pending'}</td>
                    <td>${car.dateApproved ? new Date(car.dateApproved).toLocaleDateString() : 'N/A'}</td>
                    <td>
                        <button onclick="editCar(${car.id})">Edit</button>
                        <button onclick="deleteCar(${car.id})">Delete</button>
                    </td>
                `;
                carList.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    // Add or edit a car
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const carData = {
            employeeName: form.employeeName.value,
            carRegistrationNumber: form.carRegistrationNumber.value,
            carMake: form.carMake.value,
            carModel: form.carModel.value,
            colour: form.colour.value,
            year: parseInt(form.year.value),
            isApproved: form.isApproved.value === 'true',
            dateApproved: form.dateApproved.value || null
        };

        try {
            if (editMode) {
                await fetch(`http://localhost:5000/api/cars/${currentCarId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carData)
                });
            } else {
                await fetch('http://localhost:5000/api/cars', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carData)
                });
            }
            fetchCars();
            form.reset();
            formTitle.textContent = 'Add New Car';
            submitButton.textContent = 'Add Car';
            editMode = false;
            currentCarId = null;
        } catch (error) {
            console.error('Error adding/editing car:', error);
        }
    });

    // Edit a car
    window.editCar = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cars/${id}`);
            const car = await response.json();
            form.employeeName.value = car.employeeName;
            form.carRegistrationNumber.value = car.carRegistrationNumber;
            form.carMake.value = car.carMake;
            form.carModel.value = car.carModel;
            form.colour.value = car.colour;
            form.year.value = car.year;
            form.isApproved.value = car.isApproved ? 'true' : 'false';
            form.dateApproved.value = car.dateApproved ? new Date(car.dateApproved).toISOString().split('T')[0] : '';

            formTitle.textContent = 'Edit Car';
            submitButton.textContent = 'Update Car';
            editMode = true;
            currentCarId = id;
        } catch (error) {
            console.error('Error editing car:', error);
        }
    };

    // Delete a car
    window.deleteCar = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/cars/${id}`, {
                method: 'DELETE'
            });
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    // Initial fetch
    fetchCars();
});
