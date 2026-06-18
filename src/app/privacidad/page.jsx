import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { CONTACT } from '@/data/constants'

export const metadata = {
  title: 'Política de Privacidad | GIAMA — Concesionario Oficial MG',
  description: 'Política de privacidad de GIAMA, concesionario oficial MG en Mar del Plata. Cómo recopilamos, usamos y protegemos tus datos personales conforme a la Ley N.º 25.326.',
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
}

export default function PrivacidadPage() {
  return (
    <div className="blog-page">
      <Navbar />
      <article className="legal-content">
        <Link href="/" className="blog-back">← Volver al inicio</Link>
        <h1>Política de Privacidad</h1>
        <p className="legal-updated">Última actualización: 18 de junio de 2026</p>

        <h2>Declaración de Privacidad</h2>
        <p>
          A través de esta política de privacidad, GIAMA, concesionario oficial MG en Mar del Plata y
          titular del sitio <strong>giamamg.com</strong> (en adelante, “GIAMA” o “nosotros”), informa
          cómo recopila, utiliza y almacena (en otras palabras, cómo procesa) los datos personales de
          los usuarios que ingresan a este sitio web. GIAMA forma parte de la red oficial de
          concesionarios de SAIC Motor Argentina S.A. (“MG Motor”) y adhiere a su marco de protección de
          datos. Estas personas pueden incluir contactos comerciales, proveedores, clientes y
          potenciales clientes, representantes y/o empleados, según corresponda. GIAMA actúa como
          responsable del tratamiento de los datos personales recopilados a través de este sitio. Cuando
          en esta política hablamos de “usted” o “el usuario”, nos referimos a cualquier persona cuyos
          datos se encuentren dentro del alcance de la presente declaración. Otros servicios ofrecidos
          por GIAMA o por MG Motor pueden estar sujetos a políticas de privacidad específicas.
        </p>

        <h2>1. Datos personales que recopilamos</h2>
        <p>
          Los datos personales son toda información que identifica o permite identificar a una persona
          física. Podemos recopilar y tratar los siguientes datos personales, según corresponda:
        </p>
        <ul>
          <li>Nombre y apellido.</li>
          <li>Nombre de empresa (si aplica).</li>
          <li>Teléfono de contacto.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Dirección, ciudad y país.</li>
          <li>Datos técnicos sobre su dispositivo, como dirección IP.</li>
          <li>Preferencias relacionadas con modelos, accesorios y solicitudes de prueba de manejo.</li>
          <li>Información sobre su uso del sitio web.</li>
        </ul>
        <p>
          Algunos de estos datos son obligatorios para poder brindarle determinados servicios. Si no los
          proporciona, es posible que no podamos cumplir con su solicitud.
        </p>

        <h2>2. Acceso y uso de los datos personales</h2>
        <p>
          El acceso a sus datos está limitado y solo lo tendrán las personas o áreas que lo necesiten.
          Podremos compartir datos personales con:
        </p>
        <ul>
          <li>Áreas internas como Finanzas, Ventas, Marketing y Operaciones.</li>
          <li>Proveedores de servicios de TI, hosting, asesores externos, contadores o abogados.</li>
          <li>Autoridades públicas cuando exista una obligación legal.</li>
          <li>Importadores y concesionarios oficiales de la red MG en Argentina, para responder solicitudes de información, cotizaciones o pruebas de manejo.</li>
          <li>Terceros vinculados en procesos de fusiones, adquisiciones o transferencias de negocio.</li>
        </ul>
        <p>
          En todos los casos, el tratamiento de datos se realizará conforme a la Ley N.º 25.326 de
          Protección de Datos Personales de la República Argentina y demás normas aplicables.
        </p>

        <h2>3. Transferencias internacionales</h2>
        <p>
          Actualmente no transferimos datos personales fuera de la República Argentina o de América
          Latina. En caso de hacerlo en el futuro, se lo informaremos previamente y se aplicarán las
          medidas legales correspondientes.
        </p>

        <h2>4. Bases legales para el tratamiento</h2>
        <p>Podemos procesar sus datos en función de:</p>
        <ul>
          <li>Su consentimiento.</li>
          <li>La ejecución de un contrato o medidas precontractuales.</li>
          <li>El cumplimiento de obligaciones legales.</li>
          <li>El interés legítimo de GIAMA (por ejemplo, seguridad informática, gestión de relaciones comerciales, actividades de marketing).</li>
        </ul>

        <h2>5. Finalidades</h2>
        <p>Tratamos sus datos personales para:</p>
        <ul>
          <li>Establecer y mantener relaciones con clientes y proveedores.</li>
          <li>Responder a consultas o solicitudes de información.</li>
          <li>Garantizar la seguridad del sitio y de los sistemas.</li>
          <li>Analizar el uso de nuestros sitios web (incluyendo el uso de herramientas como Google Analytics).</li>
          <li>Gestionar transacciones comerciales.</li>
          <li>Cumplir con obligaciones legales y resolver eventuales reclamos.</li>
          <li>Enviar información comercial, folletos y campañas de marketing, siempre respetando las preferencias y el consentimiento del usuario.</li>
        </ul>

        <h2>6. Derechos de los usuarios</h2>
        <p>De acuerdo con la Ley N.º 25.326, usted tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales.</li>
          <li>Rectificarlos si son inexactos o incompletos.</li>
          <li>Solicitar su supresión o actualización.</li>
          <li>Oponerse al tratamiento de sus datos para fines de marketing.</li>
          <li>Revocar el consentimiento otorgado.</li>
        </ul>
        <p>
          El ejercicio de estos derechos puede solicitarse a través de los canales de contacto que se
          indican al final de esta política. La Agencia de Acceso a la Información Pública, organismo de
          control de la Ley N.º 25.326, tiene la atribución de atender reclamos relacionados con el
          incumplimiento de las normas de protección de datos.
        </p>

        <h2>7. Plazo de conservación</h2>
        <p>
          Conservaremos los datos personales solo durante el tiempo necesario para cumplir con las
          finalidades para las que fueron recopilados o mientras exista una obligación legal que lo
          requiera.
        </p>

        <h2>8. Actualizaciones</h2>
        <p>
          Podemos modificar esta política de privacidad para reflejar cambios normativos o mejoras en
          nuestros servicios. La versión actualizada estará disponible en nuestro sitio web.
        </p>

        <h2>9. Uso de cookies</h2>
        <p>
          Utilizamos cookies para mejorar la experiencia de navegación, analizar patrones de uso y
          ofrecer contenido personalizado. El usuario puede configurar su navegador para aceptar o
          rechazar cookies, así como eliminarlas en cualquier momento.
        </p>

        <h2>10. Cómo usamos la información</h2>
        <p>La información proporcionada en nuestros sitios se utilizará únicamente para:</p>
        <ul>
          <li>Gestionar solicitudes de información, cotizaciones y pruebas de manejo.</li>
          <li>Brindar ofertas y novedades sobre productos y servicios.</li>
          <li>Elaborar estadísticas y estudios de mercado internos.</li>
        </ul>

        <h2>Contacto</h2>
        <p>
          Para ejercer sus derechos o realizar consultas sobre esta política, puede escribirnos a{' '}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o acercarse a {CONTACT.address}.
          También puede contactar a MG Motor (importador Eximar) a{' '}
          <a href="mailto:contacto@eximar.com.ar">contacto@eximar.com.ar</a>.
        </p>
      </article>
    </div>
  )
}
