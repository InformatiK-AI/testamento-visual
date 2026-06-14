'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">TesteamentoVisual</h1>
        <a href="#cta" className="text-gray-700 hover:text-blue-600 font-medium">
          Empezar
        </a>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          La Biblia completa en cómics.
        </h2>
        <p className="text-2xl text-gray-700 mb-4">
          Para que tu hijo la entienda de verdad.
        </p>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Desde Génesis hasta Apocalipsis: historias bíblicas con personajes vestidos en la época correcta, diseñadas para cautivar a adolescentes.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            id="cta"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-2 transition"
          >
            Prueba 7 días gratis →
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition">
            Ver demo primero
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Sin tarjeta de crédito. Cancelar en cualquier momento.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            ¿Por qué TesteamentoVisual?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Vestuario Histórico</h4>
              <p className="text-gray-600">
                Cada personaje viste según la época bíblica. Tu hijo ve, entiende y recuerda.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Diseñado para Adolescentes</h4>
              <p className="text-gray-600">
                No es un libro aburrido. Es un cómic visual que habla su lenguaje.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Historias Inspiradoras</h4>
              <p className="text-gray-600">
                Cada capítulo termina con una lección que inspira.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cobertura Completa: Génesis → Apocalipsis
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Antiguo Testamento</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Génesis y Éxodo</li>
                  <li>✓ Reinos y Profetas</li>
                  <li>✓ Salmos e Historias</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Nuevo Testamento</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Vida de Jesús</li>
                  <li>✓ Apóstoles y Cartas</li>
                  <li>✓ Apocalipsis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold mb-4">
            ¿Listo para que tu hijo entienda la Biblia?
          </h3>
          <p className="text-lg mb-8 text-blue-100">
            Comienza tu prueba gratuita de 7 días. Sin tarjeta. Sin compromiso.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition">
            Prueba 7 días gratis →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h4 className="text-white font-bold mb-4 md:mb-0">TesteamentoVisual</h4>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacidad</a>
              <a href="#" className="hover:text-white transition">Términos</a>
              <a href="#" className="hover:text-white transition">Contacto</a>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8">
            © 2026 TesteamentoVisual. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
