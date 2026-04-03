import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🧬</span>
          <div>
            <h1 className="font-bold text-lg leading-tight">GeneGuide</h1>
            <p className="text-blue-200 text-sm">Paediatric Genetic Testing — North Tees</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1 flex flex-col gap-6">

        {/* Development banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex items-start gap-3">
          <span className="text-xl mt-0.5">🚧</span>
          <div>
            <p className="font-semibold text-amber-800 text-sm">Site in Development</p>
            <p className="text-amber-700 text-sm mt-0.5">
              This tool is currently being developed and tested. Content and pathways may change. Please do not use for clinical decisions without consulting current local guidelines.
            </p>
          </div>
        </div>

        {/* Welcome card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome to GeneGuide</h2>
          <p className="text-blue-700 text-sm font-medium mb-4">
            For paediatricians at University Hospitals Tees NHS Foundation Trust
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            GeneGuide is a clinical decision-support tool designed to help community paediatricians
            navigate the genetic testing pathway for children in North Tees. It provides
            structured guidance on when and how to request genetic investigations, with a focus
            on Trio Whole Exome Sequencing (Trio WES) for children with intellectual disability,
            global developmental delay, and related presentations.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            The tool covers the full pathway — from deciding whether genetic testing is appropriate,
            through understanding why Trio WES is preferred over single-sample testing, to
            arranging the referral and interpreting results when they return.
          </p>
        </div>

        {/* What's inside */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">What's inside</h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: '🧬', title: 'Test Selector', desc: 'Step-by-step guidance on whether genetic testing is indicated and which test to request' },
              { icon: '❓', title: 'Why Trio?', desc: 'Evidence-based explanation of why Trio WES outperforms single-sample exome and microarray in this setting' },
              { icon: '📋', title: 'Arrange Trio', desc: 'Practical instructions for making the referral, including what information and consent is needed' },
              { icon: '📊', title: 'Results', desc: 'How to interpret and act on Trio WES results, including variants of uncertain significance' },
              { icon: '📖', title: 'Quick Reference', desc: 'At-a-glance summary of key criteria, contacts, and resources' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={() => navigate('/selector')}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-2xl text-base shadow-md transition-colors"
        >
          Enter GeneGuide →
        </button>

        <p className="text-center text-gray-400 text-xs pb-4">
          Developed for North Tees Community Paediatrics · University Hospitals Tees NHS Foundation Trust
        </p>
      </main>
    </div>
  )
}
