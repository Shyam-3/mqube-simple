const reviewModalEl = document.getElementById('reviewModal');
if (reviewModalEl) {
    reviewModalEl.addEventListener('show.bs.modal', event => {
        const trigger = event.relatedTarget;
        if (!trigger) return;
        const name = trigger.getAttribute('data-name') || '';
        const text = trigger.getAttribute('data-text') || '';
        const img = trigger.getAttribute('data-img') || '';
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalText').textContent = text;
        const photoEl = document.getElementById('modalPhoto');
        if (img) photoEl.setAttribute('src', img);
        photoEl.setAttribute('alt', name || 'Reviewer');
    });
}
