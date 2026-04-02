function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-blue-50 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-blue-700">{value}</p>
      <p className="text-xs text-blue-600 mt-1">{label}</p>
    </div>
  )
}

export default function WhyTrio() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Why Use the Trio Approach?</h2>
        <p className="text-sm text-gray-500">Clinical rationale for trio WGS in paediatric developmental disorders</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-3">
        <Stat value="12%" label="AD diagnoses that would remain VUS or unreported without trio" />
        <Stat value="14%" label="AR diagnoses that would remain VUS or unreported without trio" />
      </div>

      {/* What trio does */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
        <h3 className="font-semibold text-gray-800">What trio testing does</h3>
        <div className="space-y-3">
          {[
            { icon: '🔍', title: 'Identifies de novo variants', desc: 'Variants present in the child but absent from both parents — the most common cause of severe developmental disorders' },
            { icon: '🧬', title: 'Resolves inheritance in one step', desc: 'Determines whether a variant is inherited from an affected or unaffected parent, resolving VUS in many cases' },
            { icon: '⚡', title: 'All-at-once data', desc: 'Proband and both parents tested simultaneously — no need for sequential testing or returning to request parental samples later' },
            { icon: '🔬', title: 'No need for array CGH or FraX first', desc: 'WGS identifies chromosomal copy number variants and fragile X — no preliminary tests needed (except when a specific recognisable syndrome is suspected)' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* R27 super panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">R27 — The Super Panel</h3>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-3">
          <p className="text-teal-800 font-bold text-sm">2,892+ genes · 13 sub-panels</p>
          <p className="text-teal-700 text-sm">Covers most syndromic genetic conditions</p>
        </div>
        <p className="text-sm text-gray-600 mb-3">Sub-panels included in R27:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { code: 'R29', name: 'Intellectual disability' },
            { code: 'R59', name: 'Epilepsy' },
            { code: 'R98', name: 'Inborn errors of metabolism' },
            { code: 'R104', name: 'Skeletal dysplasia' },
            { code: '+ 9 more', name: 'panels included' },
          ].map(p => (
            <div key={p.code} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-xs font-bold text-blue-700 min-w-10">{p.code}</span>
              <span className="text-xs text-gray-600">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical examples */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">Clinical examples</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-teal-400 pl-3">
            <p className="text-xs font-semibold text-teal-600 uppercase">Example 1 — Array CGH first</p>
            <p className="text-sm text-gray-700 mt-1">10-year-old girl, mild ID, cleft palate, neonatal hypocalcaemia. Clinician suspects <strong>22q11 deletion</strong>. → Array CGH first (faster). R27 trio if normal.</p>
            <p className="text-xs text-gray-500 mt-1">Same approach for Down's, Turner's, Williams, Cri du Chat</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-3">
            <p className="text-xs font-semibold text-blue-600 uppercase">Example 2 — Straight to WGS</p>
            <p className="text-sm text-gray-700 mt-1">4-year-old boy, severe DD, dysmorphism. No recognised diagnosis. → <strong>R27 WGS trio</strong> directly. No need for array CGH or FraX first.</p>
          </div>
        </div>
      </div>

      {/* Data source */}
      <p className="text-xs text-gray-400 text-center">Source: Northern Genetics Service, March 2026. Audit data from trio tests (R27/R29/R59).</p>
    </div>
  )
}
