const { z } = window.Zod;


const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  email: z.string().email("Debe ser un correo electrónico válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault(); 

  
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    
    document.getElementById("errors").textContent = result.error.issues.map(e => e.message).join(", ");
  } else {
    alert("¡Registro exitoso!"); o
    document.getElementById("registerForm").reset(); 
  }
});
