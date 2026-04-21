document.addEventListener('DOMContentLoaded', () => {

    // ── Custom cursor ──
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (cursor && cursorFollower) {
        let mx = 0, my = 0, fx = 0, fy = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top  = my + 'px';
        });

        (function followCursor() {
            fx += (mx - fx) * 0.1;
            fy += (my - fy) * 0.1;
            cursorFollower.style.left = fx + 'px';
            cursorFollower.style.top  = fy + 'px';
            requestAnimationFrame(followCursor);
        })();
    }

    // ── Fade sections (IntersectionObserver) ──
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-section').forEach(el => fadeObserver.observe(el));

    // ── Text content slide-in ──
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15 });

    document.querySelectorAll('.text-content').forEach(el => textObserver.observe(el));

    // ── Accordion ──
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.classList.contains('open');

            document.querySelectorAll('.accordion-header.open').forEach(h => {
                h.classList.remove('open');
                h.nextElementSibling.style.height = '0';
            });

            if (!isOpen) {
                header.classList.add('open');
                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
});
