type RCode = {
  code: string
  name: string
  desc: string
  who: string
  paeds: boolean
}

const RCODES: RCode[] = [
  {
    code: 'R27', name: 'Paediatric WGS super panel',
    desc: 'Super panel covering 2,892+ genes, 13 sub-panels including ID (R29), epilepsy (R59), IEM (R98), skeletal dysplasia (R104). First-line WGS for most paediatric patients with possible syndromic genetic diagnosis.',
    who: 'Clinical Genetics · Metabolic Medicine · Paediatric Neurology · Paediatrics · Community Paediatrics',
    paeds: true,
  },
  {
    code: 'R28', name: 'Chromosomal microarray (SNP array)',
    desc: 'First-line when a recognisable chromosomal syndrome is suspected (Down\'s, Williams, 22q11, Cri du Chat etc.). Faster results than WGS for chromosomal causes.',
    who: 'Clinical Genetics · Community Paediatrics · Neonatology · Neurology · Paediatrics',
    paeds: true,
  },
  {
    code: 'R29', name: 'Intellectual disability WGS',
    desc: 'WGS panel for unexplained moderate/severe/profound ID or GDD where monogenic cause is suspected. Included within R27 — request R27 in preference unless standalone ID panel is specifically indicated.',
    who: 'Clinical Genetics · Metabolic Medicine · Neurology · Paediatrics · Community Paediatrics',
    paeds: true,
  },
  {
    code: 'R48', name: 'Prader-Willi syndrome',
    desc: 'Methylation-specific testing — detects deletion, UPD, and imprinting defects. Do not rely on microarray alone. Quick turnaround.',
    who: 'Clinical Genetics · Community Paediatrics · Neonatology · Neurology · Paediatrics · Endocrinology',
    paeds: true,
  },
  {
    code: 'R59', name: 'Early onset or syndromic epilepsy WGS',
    desc: 'WGS for unexplained epilepsy with monogenic suspicion. Included within R27 — request R27 if DD + seizures. Standalone R59 requires specialist referral.',
    who: 'Clinical Genetics · Metabolic Medicine · Neurology only',
    paeds: false,
  },
  {
    code: 'R70', name: 'Spinal muscular atrophy type 1',
    desc: 'MLPA for SMN1/SMN2. Quick turnaround — do not wait for WGS if SMA suspected. Treatment window is narrow; nusinersen/onasemnogene available on NHS.',
    who: 'Clinical Genetics · Neonatology · Neurology · Paediatrics',
    paeds: true,
  },
  {
    code: 'R72', name: 'Myotonic dystrophy type 1',
    desc: 'CTG repeat expansion in DMPK — not detected by standard WGS. Must request separately. Examine and test mother if congenital form suspected.',
    who: 'Clinical Genetics · Neurology only — refer if suspected',
    paeds: false,
  },
  {
    code: 'R98', name: 'Inborn errors of metabolism WGS',
    desc: 'WGS/WES for likely IEM where targeted testing is not possible. Included within R27 but standalone R98 requires specialist referral.',
    who: 'Clinical Genetics · Metabolic Medicine · Neurology only — refer if suspected',
    paeds: false,
  },
  {
    code: 'R104', name: 'Skeletal dysplasia WGS',
    desc: 'WGS for likely monogenic skeletal dysplasia. Requires prior review by a Clinical Geneticist or Radiologist expert in skeletal dysplasias before requesting.',
    who: 'Clinical Genetics only — refer if suspected',
    paeds: false,
  },
  {
    code: 'R137', name: 'Congenital heart disease microarray',
    desc: 'SNP array — alternative to R28, used specifically where congenital heart disease is the primary feature.',
    who: 'Cardiology · Clinical Genetics · Paediatrics',
    paeds: true,
  },
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
        <h3 className="font-semibold text-gray-800 mb-1">R-code reference</h3>
        <div className="flex gap-3 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"/> Community paeds can request</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"/> Specialist referral required</span>
        </div>
        <div className="space-y-3">
          {RCODES.map(r => (
            <div key={r.code} className={`rounded-xl p-3 border ${r.paeds ? 'bg-white border-gray-100' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${r.paeds ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{r.code}</span>
                <span className="text-sm font-semibold text-gray-800 flex-1">{r.name}</span>
                {!r.paeds && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg font-semibold shrink-0">Refer</span>}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-1.5">{r.desc}</p>
              <p className="text-xs font-medium text-gray-500">
                <span className="text-gray-400">Who can request: </span>{r.who}
              </p>
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
