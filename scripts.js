    /* Put this content into script.js */
    // Wait until DOM and QRious are ready
    window.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('qrForm');
    const idInput = document.getElementById('idNumber');
    const nameInput = document.getElementById('fullName');
    const acadInput = document.getElementById('Year');
    const canvas = document.getElementById('qrCanvas');
    const meta = document.getElementById('qrMeta');
    const downloadLink = document.getElementById('downloadLink');
    const clearBtn = document.getElementById('clearBtn');

    let qr = new QRious({ element: canvas, size: 300, value: '' });

    function makePayload(){
        // Create a compact payload. Use JSON so it's structured for later decoding.
        const payload = {
        id: idInput.value.trim(),
        name: nameInput.value.trim(),
        acad: acadInput.value.trim()
        };
        return JSON.stringify(payload);
    }

    function updateMeta(){
        if(!idInput.value && !nameInput.value && !acadInput.value){
        meta.textContent = '';
        downloadLink.classList.add('hidden');
        return;
        }
        
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        // simple validation
        if(!idInput.value.trim() || !nameInput.value.trim() || !acadInput.value.trim()){
        alert('Please fill all fields.');
        return;
        }
        const payload = makePayload();
        qr.value = payload;

        // update meta and show download link
        updateMeta();
        // Convert canvas to dataURL for download
        setTimeout(()=>{
        try{
            const dataUrl = canvas.toDataURL('image/png');
            downloadLink.href = dataUrl;
            downloadLink.classList.remove('hidden');
            downloadLink.textContent = 'Download PNG';
        }catch(err){
            console.error(err);
        }
        }, 50);
    });

    clearBtn.addEventListener('click', function(){
        form.reset();
        qr.value = '';
        updateMeta();
    });

    // Live meta update
    [idInput, nameInput, acadInput].forEach(inp=>inp.addEventListener('input', updateMeta));

    // initial meta
    updateMeta();
    });

