document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Step 1: Toggle the current (child or parent) panel
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            
            // Set the immediate panel's height
            if (panel.style.maxHeight) {
                // If panel is currently open (has max-height set), close it
                panel.style.maxHeight = null;
            } else {
                // If panel is closed, open it to its content height
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            
            // Step 2: Update the parent panel's height if this is a nested accordion
            updateParentPanelHeight(this);
        });
    });
});


function updateParentPanelHeight(toggledAccordion) {
    // Check if the clicked accordion is INSIDE another panel
    let parentPanel = toggledAccordion.closest('.parent_panel');
    
    // Safety check: Is there a panel ancestor?
    if (parentPanel) {
        // Find the accordion that controls this parentPanel
        let controllingAccordion = parentPanel.previousElementSibling;

        if (controllingAccordion && controllingAccordion.classList.contains('active')) {
            // The parent panel is currently open. We MUST recalculate its height.
            setTimeout(() => {
                parentPanel.style.maxHeight = parentPanel.scrollHeight + "px";
                updateParentPanelHeight(controllingAccordion);
            }, 50);
        }
    }
    // You may need to recursively check for multiple levels of nesting.
}