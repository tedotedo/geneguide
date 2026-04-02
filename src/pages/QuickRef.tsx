const RCODES = [
  { code: 'R27', name: 'Paediatric WGS super panel', desc: '2,892+ genes, 13 sub-panels including R29 (ID), R59 (epilepsy), R98 (IEM), R104 (skeletal dysplasia). First-line for most paediatric patients with possible syndromic genetic diagnosis.' },
  { code: 'R28', name: 'Chromosomal microarray (SNP array)', desc: 'First-line when a recognisable chromosomal syndrome is suspected (Down\'s, Turner\'s, Williams, 22q11, Cri du Chat). Faster results than WGS.' },
  { code: 'R29', name: 'Intellectual disability panel', desc: 'Included within R27. Can be requested separately.' },
  { code: 'R59', name: 'Epilepsy panel', desc: 'Included within R27 (R27 includes R59). For DD + seizures.' },
  { code: 'R70', name: 'Spinal muscular atrophy type 1', desc: 'Quick turnaround single gene test. Request separately — may not be reliably detected by WGS.' },
  { code: 'R72', name: 'Myotonic dystrophy', desc: 'Quick turnaround single gene test. Trinucleotide repeat — not detected by standard WGS. Request separately.' },
  { code: 'R98', name: 'Inborn errors of metabolism', desc: 'Included within R27.' },
  { code: 'R104', name: 'Skeletal dysplasia', desc: 'Included within R27.' },
  { code: 'R137', name: 'Chromosomal microarray (array CGH)', desc: 'SNP array — alternative to R28 for recognisable chromosomal conditions.' },
  { code: 'R48', name: 'Prader-Willi syndrome', desc: 'Imprinting disorder — quick turnaround. Request separately.' },
]

const CONTACTS = [
  { label: 'Northern Genetics Service', email: 'nuth.dna@nhs.net', note: 'Main contact for advice, forms, and result queries' },
  { label: 'Newcastle Genetics Lab', email: 'nuth.dna@nhs.net', note: 'Samples and request forms' },
]

const URGENT_FLAGS = [
  { flag: 'Mother of patient is pregnant', action: 'Refer mother and child urgently to Clinical Genetics. Do not wait for scans or other results.' },
  { flag: 'Urgent management implications', action: 'Contact Northern Genetics for advice before proceeding with testing.' },
]

export default function QuickRef() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Quick Reference</h2>
        <p className="text-base text-gray-500">R-codes, contacts, and urgent flags</p>
      </div>

      {/* Urgent */}
      <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-5">
        <h3 className="font-bold text-red-700 mb-3">⚠️ Urgent flags</h3>
        <div className="space-y-3">
          {URGENT_FLAGS.map(u => (
            <div key={u.flag}>
              <p className="text-sm font-semibold text-red-800">{u.flag}</p>
              <p className="text-base text-red-700 mt-0.5">{u.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* R-codes */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">R-code reference</h3>
        <div className="space-y-3">
          {RCODES.map(r => (
            <div key={r.code} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-lg">{r.code}</span>
                <span className="text-base font-semibold text-gray-800">{r.name}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">📞 Contacts</h3>
        <div className="space-y-3">
          {CONTACTS.map(c => (
            <div key={c.label}>
              <p className="text-base font-semibold text-gray-800">{c.label}</p>
              <p className="text-xs text-gray-500 mb-1">{c.note}</p>
              <a href={`mailto:${c.email}`}
                className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-100"
              >
                ✉ {c.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Key rules */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">📋 Key rules</h3>
        <div className="space-y-2">
          {[
            'WGS identifies CNVs and fragile X — no need for array CGH or FraX first (unless recognisable syndrome suspected)',
            'Array CGH first if a recognisable chromosomal syndrome is suspected — faster results',
            'Trio approach needed: proband + both parents sampled simultaneously',
            'One WGS request form per trio; one ROD form per individual (3 total)',
            'One genetic test request form per blood sample (3 samples = 3 forms)',
            'Email WGS form + RODs to nuth.dna@nhs.net',
            'Do not share uncertain/unexpected results with patients without genetics input',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-sm flex-shrink-0 mt-0.5">•</span>
              <p className="text-base text-gray-700">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution */}
      <p className="text-xs text-gray-400 text-center">
        Based on North Tees community paediatrics genetic testing pathway (April 2026) and Northern Genetics Service trio WGS guidance (March 2026).
      </p>
    </div>
  )
}
