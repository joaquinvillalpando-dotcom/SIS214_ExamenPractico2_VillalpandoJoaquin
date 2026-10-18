(() => {
    const mensajesError = {
        txt_nombre: {
            valueMissing: 'Ingresa tu nombre completo.',
            tooShort: 'El nombre debe tener al menos 4 caracteres.',
            patternMismatch: 'Utiliza letras y espacios.'
        },
        txt_correo: {
            valueMissing: 'Ingresa tu correo electrónico.',
            typeMismatch: 'Escribe un correo electrónico válido.'
        },
        txt_telefono: {
            valueMissing: 'Ingresa un número de teléfono.',
            patternMismatch: 'Usa ocho dígitos o el prefijo +591.'
        },
        txt_motivo: {
            valueMissing: 'Indica el motivo de contacto.'
        },
        txt_mensaje: {
            valueMissing: 'Escribe un mensaje.',
            tooShort: 'El mensaje debe tener al menos 10 caracteres.'
        },
        chk_aceptacion: {
            valueMissing: 'Debes aceptar el tratamiento de tus datos.'
        }
    };

    const obtenerMensajeError = (campo) => {
        const mensajes = mensajesError[campo.id] || {};
        const reglas = ['valueMissing', 'typeMismatch', 'tooShort', 'patternMismatch'];
        const regla = reglas.find((nombre) => campo.validity[nombre]);

        return mensajes[regla] || 'Revisa este campo.';
    };

    const validarCampo = (campo) => {
        const valido = campo.checkValidity();
        const ids = (campo.getAttribute('aria-describedby') || '').split(' ');
        const idError = ids.find((id) => id.startsWith('error_'));
        const salida = document.getElementById(idError);

        campo.setAttribute('aria-invalid', String(!valido));
        if (salida) {
            salida.textContent = valido ? '' : obtenerMensajeError(campo);
        }
        return valido;
    };

    const emailConfigurado = () => {
        const { serviceId, templateId, publicKey } = window.PortfolioConfig.emailjs;
        return [serviceId, templateId, publicKey].every((valor) =>
            typeof valor === 'string' && valor.trim() !== ''
        );
    };

    const enviarEmail = async (datos) => {
        const { serviceId, templateId, publicKey } = window.PortfolioConfig.emailjs;
        const controlador = new AbortController();
        const tiempo = setTimeout(() => controlador.abort(), 15000);

        const cuerpo = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_name: datos.nombre,
                reply_to: datos.correo,
                phone: datos.telefono,
                subject: datos.motivo,
                message: datos.mensaje
            }
        };

        try {
            const respuesta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cuerpo),
                signal: controlador.signal
            });

            if (!respuesta.ok) {
                throw new Error(`EmailJS devolvió HTTP ${respuesta.status}.`);
            }
        } finally {
            clearTimeout(tiempo);
        }
    };

    const initContact = () => {
        const formulario = document.getElementById('formulario_contacto');
        const estado = document.getElementById('mensaje_formulario');
        const textarea = document.getElementById('txt_mensaje');
        const contador = document.getElementById('contador_mensaje');
        const boton = document.getElementById('boton_enviar');
        const nota = document.getElementById('nota_envio');

        if (!formulario || !estado || !textarea || !contador || !boton) return;

        const campos = [...formulario.querySelectorAll('input, textarea')];

        const mostrarEstado = (tipo, mensaje) => {
            estado.hidden = false;
            estado.dataset.estado = tipo;
            estado.textContent = mensaje;
        };

        const actualizarContador = () => {
            contador.textContent = `${textarea.value.length} / 500`;
        };

        campos.forEach((campo) => {
            campo.addEventListener('input', () => {
                if (campo.getAttribute('aria-invalid') === 'true' || campo.value) {
                    validarCampo(campo);
                }
            });
            campo.addEventListener('blur', () => validarCampo(campo));
        });

        textarea.addEventListener('input', actualizarContador);

        if (emailConfigurado()) {
            nota.textContent = 'El mensaje se enviará mediante EmailJS.';
        }

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const resultados = campos.map((campo) => validarCampo(campo));
            if (!resultados.every(Boolean)) {
                mostrarEstado('error', 'Revisa los campos marcados antes de continuar.');
                formulario.querySelector('[aria-invalid="true"]')?.focus();
                return;
            }

            if (!emailConfigurado()) {
                mostrarEstado(
                    'aviso',
                    'El envío por EmailJS aún no está configurado. Usa el correo de contacto de esta página.'
                );
                return;
            }

            const datos = Object.fromEntries(new FormData(formulario).entries());
            boton.disabled = true;
            boton.textContent = 'Enviando mensaje...';
            formulario.setAttribute('aria-busy', 'true');
            mostrarEstado('cargando', 'Conectando con el servicio de correo...');

            try {
                await enviarEmail(datos);
                mostrarEstado('exito', '¡Mensaje enviado! Gracias por comunicarte.');
                formulario.reset();
                actualizarContador();
                campos.forEach((campo) => campo.setAttribute('aria-invalid', 'false'));
            } catch (error) {
                console.warn('Error controlado al enviar el formulario:', error);
                mostrarEstado(
                    'error',
                    'No se pudo enviar el mensaje. Intenta de nuevo o usa el correo de contacto.'
                );
            } finally {
                boton.disabled = false;
                boton.textContent = 'Enviar mensaje';
                formulario.setAttribute('aria-busy', 'false');
            }
        });
    };

    window.PortfolioModules = window.PortfolioModules || {};
    window.PortfolioModules.initContact = initContact;
})();
