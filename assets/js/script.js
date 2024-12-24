document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON data and initialize the functionality
    fetch('./assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            const buttons = document.querySelectorAll('.timeframe-button');
            const defaultButton = document.querySelector('[data-view="weekly"]');
            // Set the default active button
            if (defaultButton) {
                setActiveButton(defaultButton);
            }
            // Add click event listeners to all buttons
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const selectedView = button.getAttribute('data-view');
                    updateData(selectedView, data);
                    setActiveButton(button);
                });
            });
            updateData('weekly', data);
        });
    // Update DOM elements with new data based on the selected view
    function updateData(view, data) {
        data.forEach(item => {
            const title = item.title.toLowerCase().replace(' ', '-');
            const current = item.timeframes[view].current;
            const previous = item.timeframes[view].previous;
            const currentElement = document.querySelector(`#${title}-current`);
            if (currentElement) {
                currentElement.textContent = `${current}hrs`;
            }
            const previousElement = document.querySelector(`#${title}-previous`);
            if (previousElement) {
                previousElement.textContent = `Previous - ${previous}hrs`;
            }
        });
    }
    // Update button styles to indicate the active state
    function setActiveButton(clickedButton) {
        const buttons = document.querySelectorAll('.timeframe-button');
        buttons.forEach(button => {
            button.classList.remove('text-PaleBlue');
            button.classList.add('text-DesaturatedBlue');
        });
        clickedButton.classList.remove('text-DesaturatedBlue');
        clickedButton.classList.add('text-PaleBlue',);
    }
});