(function () {
    let currentYear, currentMonth;

    const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const MONTH_NAMES_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    function init() {
        const now = new Date();
        currentYear = now.getFullYear();
        currentMonth = now.getMonth();

        const toggleBtn = document.getElementById('calendar-toggle');
        const modal = document.getElementById('calendar-modal');
        const closeBtn = document.getElementById('close-calendar');

        if (!toggleBtn || !modal) return;

        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            renderCalendar(currentYear, currentMonth);
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', hideModal);
        }

        modal.addEventListener('click', function (e) {
            if (e.target === modal) hideModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') hideModal();
        });
    }

    function hideModal() {
        const modal = document.getElementById('calendar-modal');
        if (!modal) return;
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }

    function renderCalendar(year, month) {
        const calContainer = document.getElementById('reservation-calendar');
        if (!calContainer) return;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let html = `
            <div class="flex items-center justify-between mb-6">
                <button type="button" id="cal-prev" class="text-white/40 hover:text-[#d4af37] transition-colors w-8 h-8 flex items-center justify-center text-xl rounded-lg hover:bg-white/5">‹</button>
                <span class="text-white text-sm tracking-widest font-mincho">${MONTH_NAMES[month]} ${year}</span>
                <button type="button" id="cal-next" class="text-white/40 hover:text-[#d4af37] transition-colors w-8 h-8 flex items-center justify-center text-xl rounded-lg hover:bg-white/5">›</button>
            </div>
            <div class="grid grid-cols-7 gap-1 mb-1">
                ${DAY_NAMES.map((d, i) => `<div class="text-center text-[9px] tracking-widest pb-2 ${i === 0 ? 'text-red-400/60' : 'text-white/30'}">${d}</div>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-1">
        `;

        for (let i = 0; i < firstDay; i++) {
            html += `<div></div>`;
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const isSunday = date.getDay() === 0;
            const isPast = date < today;
            const isClosed = isSunday || isPast;
            const isLimited = !isClosed && d % 7 === 0;
            const pad = (n) => String(n).padStart(2, '0');
            const dataDate = `${year}-${pad(month + 1)}-${pad(d)}`;

            if (isClosed) {
                html += `<div class="text-center py-2 text-xs rounded-lg text-white/20 cursor-not-allowed select-none">${d}</div>`;
            } else if (isLimited) {
                html += `<div class="cal-date text-center py-2 text-xs rounded-lg cursor-pointer text-orange-300/80 hover:bg-orange-500/20 border border-orange-500/20 transition-all duration-200" data-date="${dataDate}">${d}</div>`;
            } else {
                html += `<div class="cal-date text-center py-2 text-xs rounded-lg cursor-pointer text-white/80 hover:bg-[#d4af37]/20 hover:text-[#d4af37] border border-transparent hover:border-[#d4af37]/30 transition-all duration-200" data-date="${dataDate}">${d}</div>`;
            }
        }

        html += `</div>`;
        calContainer.innerHTML = html;

        document.getElementById('cal-prev').addEventListener('click', function () {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar(currentYear, currentMonth);
        });

        document.getElementById('cal-next').addEventListener('click', function () {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            renderCalendar(currentYear, currentMonth);
        });

        calContainer.querySelectorAll('.cal-date').forEach(function (cell) {
            cell.addEventListener('click', function () {
                const dateVal = this.dataset.date;
                const hiddenInput = document.getElementById('selected-reservation-date');
                const toggleBtn = document.getElementById('calendar-toggle');

                if (hiddenInput) hiddenInput.value = dateVal;

                if (toggleBtn) {
                    const parts = dateVal.split('-');
                    const label = `${MONTH_NAMES_SHORT[parseInt(parts[1]) - 1]} ${parseInt(parts[2])}, ${parts[0]}`;
                    const span = toggleBtn.querySelector('span');
                    if (span) span.textContent = label;
                    toggleBtn.classList.add('text-white');
                    toggleBtn.classList.remove('text-white/40');
                }

                hideModal();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
