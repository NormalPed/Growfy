window.addEventListener("load",windowLoad);

function windowLoad() {

    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if(digitsCounters){
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseFloat(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) =>{
            if(!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            if (Number.isInteger(startValue)) {
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            }else{
                digitsCounter.innerHTML = (progress * (startPosition + startValue)).toFixed(1);
            }
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    // digitsCountersInit();

    let options ={
        threshold: 1,
    }
    let observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                } 
            }
        });
    }, options);

    let sections = document.querySelectorAll("._animate-values-section");
    if(sections.length){
        sections.forEach(section =>{
            observer.observe(section);
        })
    }
}