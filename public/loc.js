function initMap() {
	// The location of Uluru
	var uluru = { lat: 28.5672, lng: 77.3211 };
	// The map, centered at Uluru
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: uluru
	});
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({ position: uluru, map: map });
}

anychart.onDocumentReady(function() {
	// the data
	var data = {
		header: ['Time', 'Population'],
		rows: [
			['10 AM', 50],
			['11 AM', 47],
			['12 PM', 30],
			['1 PM', 32],
			['2 PM', 28],
			['3 PM', 30],
            ['4 PM', 45],
            ['5 AM', 50],
			['6 AM', 47],
			['7 PM', 38],
			['8 PM', 32],
			['9 PM', 25],
			['10 PM', 10],
		]
	};

	var chart = anychart.column();

	// add the data
	chart.data(data);
	chart.title('Prediction Graph of the Today');
    chart.container('container');
	chart.draw();
});

let book_btn=document.getElementsByClassName('book-slot')[0];


book_btn.addEventListener('click',()=>{
	let book_time=document.querySelector('input[type="time"]').value
	let res=confirm(`Are u sure u wanna book a slot @ ${book_time}`)
	if(res==true)
		alert('Very Nice')
	else
		alert('MAybe some other day :)')
})
