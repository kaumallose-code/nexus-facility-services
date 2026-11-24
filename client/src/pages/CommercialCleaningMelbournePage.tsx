import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import PageMeta from "@/components/PageMeta";

const HERO_IMAGE = "/manus-storage/services_bg_escalator_534aa57a.png";
const SCOPE_IMAGE = "/manus-storage/nexus-floor-stripping-sealing_9a38d672.jpg";
const PROOF_IMAGE = "/manus-storage/nexus_van_warehouse_4e0b9698.jpg";
const PHONE = "0477 376 440";
const SECONDARY_PHONE = "0404 934 544";
const EMAIL = "admin.hr@nexusfacility.au";

const CTA = ({ children }: { children: string }) => (
  <Link
    href="/contact"
    className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider"
    style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}
  >
    {children} <ArrowRight className="h-4 w-4" />
  </Link>
);

const SectionHeading = ({ children }: { children: string }) => (
  <h2 className="mb-7 text-4xl font-black uppercase leading-none md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
    {children}
  </h2>
);

const Subheading = ({ children }: { children: string }) => (
  <h3 className="mb-3 text-2xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
    {children}
  </h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed" style={{ color: "oklch(0.74 0.05 230)" }}>{children}</p>
);

const FAQ = ({ question, children }: { question: string; children: React.ReactNode }) => (
  <div className="border-l-2 pl-5" style={{ borderColor: "oklch(0.62 0.22 230 / 0.48)" }}>
    <Subheading>{question}</Subheading>
    <Body>{children}</Body>
  </div>
);

export default function CommercialCleaningMelbournePage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <PageMeta
        title="Commercial Cleaning Melbourne | Nexus Facility Group"
        description="Commercial cleaning in Melbourne's south-east and across Victoria. Office, retail, medical centre, and warehouse cleaning. Free quotes from Nexus Facility Group."
        canonicalPath="/commercial-cleaning-melbourne"
        keywords="commercial cleaning melbourne, commercial cleaners Melbourne south-east, office cleaning Victoria, retail cleaning Melbourne, warehouse cleaning Melbourne"
      />
      <section className="relative overflow-hidden border-b" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, oklch(0.07 0.04 245 / 0.96) 0%, oklch(0.08 0.04 245 / 0.84) 53%, oklch(0.08 0.04 245 / 0.42) 100%)" }} />
        <div className="relative container grid min-h-[640px] items-center gap-12 py-24 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Commercial cleaning · Melbourne and Victoria</p>
            <h1 className="mb-7 max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Commercial Cleaning Services in Melbourne</h1>
            <div className="max-w-2xl space-y-5 text-lg">
              <Body>A clean workplace makes everyday business a little easier. Your team can get on with their work, visitors feel welcome, and you're not chasing up cleaning jobs that should already be done.</Body>
              <Body>Nexus Facility Group provides commercial cleaning in Melbourne, with a strong focus on the south-eastern suburbs and Mornington Peninsula. We look after offices, retail stores, medical centres, warehouses and other commercial properties. The work is shaped around your building, the people who use it and the jobs that need doing.</Body>
              <Body>Whether you're setting up a new cleaning service or changing an existing one, we'll help you work out a practical plan for your premises.</Body>
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"><CTA>Get a Free Commercial Cleaning Quote</CTA><a href="tel:0477376440" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: "oklch(0.78 0.05 230)", fontFamily: "'Barlow Condensed', sans-serif" }}><Phone className="h-4 w-4" /> {PHONE}</a></div>
          </div>
          <div className="overflow-hidden border" style={{ borderColor: "oklch(0.62 0.22 230 / 0.36)", background: "oklch(0.08 0.04 245 / 0.84)" }}>
            <img src={HERO_IMAGE} alt="Commercial cleaning at a Melbourne workplace by Nexus Facility Group" className="h-80 w-full object-cover lg:h-[440px]" />
            <div className="p-5"><p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "oklch(0.62 0.22 230)" }}>Practical plans for working properties</p></div>
          </div>
        </div>
      </section>

      <section className="border-b py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container">
          <SectionHeading>Commercial Cleaning Across Melbourne's South-East</SectionHeading>
          <div className="max-w-4xl space-y-5"><Body>If your business is in Melbourne's south-east, you need a cleaner who understands the mix of workplaces in the area. A shop in Cranbourne doesn't need exactly the same service as an office in Clyde North or a warehouse near Pakenham.</Body><Body>We cover communities across Casey, Cardinia, the Mornington Peninsula and surrounding suburbs, taking the size and day-to-day use of each property into account.</Body></div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="border p-7" style={{ background: "oklch(0.13 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.22)" }}><MapPin className="mb-5 h-7 w-7" style={{ color: "oklch(0.62 0.22 230)" }} /><Subheading>Casey and Cardinia</Subheading><Body>Our listed service areas include Clyde, Clyde North, Cranbourne, Pakenham, Pakenham Upper, Nar Nar Goon, Koo Wee Rup and Tooradin. We also advertise coverage in Narre Warren. From reception areas to staff facilities and busy floors, we focus on the parts of the workplace that matter most to the people using them.</Body></div>
            <div className="border p-7" style={{ background: "oklch(0.13 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.22)" }}><MapPin className="mb-5 h-7 w-7" style={{ color: "oklch(0.62 0.22 230)" }} /><Subheading>Mornington Peninsula, Western Port and Bass Coast</Subheading><Body>We serve Mornington, Mount Martha, Dromana, Flinders, Hastings, Somerville, Baxter and Bittern. Wonthaggi is part of our broader Bass Coast coverage, rather than the Mornington Peninsula.</Body><div className="mt-4"><Body>Businesses in Langwarrin, Oakleigh, Chadstone and other south-eastern suburbs can also enquire about cleaning. Send us your suburb or postcode, and we'll confirm availability.</Body></div></div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container"><SectionHeading>What's Included in Our Commercial Cleaning Services?</SectionHeading><div className="max-w-4xl"><Body>There's no one-size-fits-all checklist for a commercial property. We look at which areas get the most use, what needs regular attention, and where a deeper clean would make a difference.</Body></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="border p-7" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.16)" }}><Subheading>Offices, Workstations and Reception Areas</Subheading><Body>We help keep the spaces people see and use each day looking neat and ready for work. Typical tasks include dusting accessible desks and furniture, wiping reception counters and meeting tables, vacuuming carpets, mopping suitable hard floors, cleaning accessible internal glass and mirrors, emptying general waste bins, and wiping frequently touched surfaces.</Body><div className="mt-4"><Body>In busy offices, shared areas often need the most attention. We focus on those everyday details rather than treating every room the same.</Body></div></div>
            <div className="border p-7" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.16)" }}><Subheading>Staff Kitchens, Washrooms and Shared Facilities</Subheading><Body>Staff kitchens and washrooms see plenty of use, so keeping them clean makes a real difference. Cleaning can include toilets, basins, taps, mirrors, kitchen benches, tables, splashbacks, cupboard exteriors, floors, bins, door handles and switches.</Body><div className="mt-4"><Body>This is everyday staff-kitchen cleaning. Grease extraction, commercial kitchen exhaust hoods and ductwork are specialist services and are not part of a standard commercial cleaning visit.</Body></div></div>
            <div className="border p-7" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.16)" }}><Subheading>Floors, Carpets and General Waste</Subheading><Body>Floors collect dirt quickly, especially near entrances and in high-traffic areas. Routine vacuuming, sweeping and mopping help keep them presentable. When a property needs more, Nexus also offers carpet steam cleaning and specialist floor services such as scrubbing, stripping, sealing and polishing. We'll make clear what's included in the regular service and what needs its own quote.</Body></div>
            <div className="border p-7" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.16)" }}><Subheading>Periodic and Deep Cleaning</Subheading><Body>Even a well-kept workplace needs a more thorough clean from time to time. Dust builds up in harder-to-reach areas, and heavily used surfaces can need extra work. A periodic commercial deep clean gives those areas attention without adding every task to your routine visits.</Body></div>
          </div>
          <div className="mt-10 overflow-hidden border" style={{ borderColor: "oklch(0.62 0.22 230 / 0.25)" }}><img src={SCOPE_IMAGE} alt="Routine commercial cleaning of work surfaces in Melbourne" className="h-72 w-full object-cover md:h-96" /></div>
        </div>
      </section>

      <section className="border-b py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container"><SectionHeading>Commercial Properties We Clean</SectionHeading><div className="max-w-4xl"><Body>Different workplaces have different priorities. Here's how our services fit the businesses we work with.</Body></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div><Subheading>Offices and Corporate Workplaces</Subheading><Body>Workstations, meeting rooms, reception areas, and staff amenities need regular care. Whether you manage a small professional suite or a larger corporate workplace, we help keep it clean and comfortable. For more detail, see our <Link href="/office-cleaning-melbourne" className="underline" style={{ color: "oklch(0.62 0.22 230)" }}>Office Cleaning Melbourne service</Link>.</Body></div>
            <div><Subheading>Retail Stores and Showrooms</Subheading><Body>Customers notice the condition of entrances, floors, counters, and display spaces. We focus on those visible areas as well as the facilities used by staff. See Retail Cleaning Melbourne for shop and showroom-specific work.</Body></div>
            <div><Subheading>Medical Centres and Healthcare Facilities</Subheading><Body>We clean non-clinical areas of medical centres, including reception areas, waiting rooms, administrative spaces, washrooms and staff amenities. Clinical areas and infection-control cleaning are assessed separately before any work is agreed. See Medical Centre Cleaning Melbourne for more detail.</Body></div>
            <div><Subheading>Warehouses and Distribution Centres</Subheading><Body>Large floors, dust, walkways and staff amenities all need practical attention. We clean suitable surfaces and accessible work areas while taking site access and safety requirements into account. See Warehouse Cleaning Melbourne for more detail.</Body></div>
          </div>
          <div className="mt-10"><CTA>Talk to Us About Your Cleaning Needs</CTA></div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container"><SectionHeading>Cleaning That Fits Around Your Working Day</SectionHeading><div className="max-w-4xl space-y-5"><Body>The right schedule depends on what happens in your building. An office with people coming in daily may need frequent attention to kitchens and washrooms. A shop might need extra cleaning ahead of a busy trading period. A warehouse may need regular upkeep alongside occasional floor cleaning.</Body><Body>We consider how many people use the space, which areas get dirty fastest, your working hours, the type of flooring, and any access restrictions. For ongoing cleaning, we agree on the tasks and frequency in advance so there's no confusion about what the service covers.</Body><Body>Need cleaning outside normal business hours? Tell us your preferred times, and we'll confirm what's available.</Body></div></div></section>

      <section className="border-b py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container"><SectionHeading>How Our Commercial Cleaning Service Works</SectionHeading><div className="grid gap-5 md:grid-cols-3">{[
        ["Tell Us About Your Property", "Call or send an enquiry with your suburb, type of business, and the areas you want cleaned. You don't need to have every detail worked out — just tell us what's causing trouble or what you'd like handled better."],
        ["Get a Clear Quote", "We'll go through the size of the property, the cleaning tasks, and the frequency you have in mind. For a larger or more complex site, a visit may help us price the job accurately. You'll know what the quote covers before you decide."],
        ["Arrange Your Cleaning", "Once the work and schedule are agreed, we'll coordinate the service around your property's needs. If something changes, you can get in touch to review the plan."],
      ].map(([title, text], index) => <div key={title} className="border p-7" style={{ background: "oklch(0.13 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.22)" }}><div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)" }}>{index + 1}</div><Subheading>{title}</Subheading><Body>{text}</Body></div>)}</div></div></section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container"><SectionHeading>Why Choose Nexus Facility Group?</SectionHeading><div className="max-w-4xl space-y-5"><Body>Good commercial cleaning isn't just about how a floor looks at the end of a visit. It's also about showing up with a clear understanding of the job and being easy to deal with.</Body><Body>Nexus Facility Group states that it is fully insured and displays RACV business insurance details on its website. The website also describes the business as a licensed labour hire provider in Victoria. Current insurance and licence documentation should be checked during supplier onboarding.</Body><Body>Alongside regular workplace cleaning, you can enquire about carpet steam cleaning, floor care, window cleaning and pressure washing. It's useful when a property needs occasional specialist work as well as its usual upkeep.</Body><Body>We keep communication straightforward: tell us what needs cleaning, we'll explain the service, and we agree on the work before it begins. Learn more about Nexus Facility Group at <Link href="/about" className="underline" style={{ color: "oklch(0.62 0.22 230)" }}>about Nexus Facility Group</Link>.</Body></div><div className="mt-10 overflow-hidden border" style={{ borderColor: "oklch(0.62 0.22 230 / 0.25)" }}><img src={PROOF_IMAGE} alt="Nexus Facility Group commercial cleaning team in Victoria" className="h-72 w-full object-cover md:h-96" /></div></div></section>

      <section className="border-b py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container"><SectionHeading>Commercial Cleaning Across Metropolitan Melbourne and Victoria</SectionHeading><div className="max-w-4xl space-y-5"><Body>Our service area extends beyond the south-east to metropolitan Melbourne and locations across regional Victoria. The website lists coverage in the Geelong, Ballarat, Bendigo and Gippsland regions. If you manage several premises, send us the locations, and we'll confirm what can be arranged.</Body><Body>See the full list of advertised areas at <Link href="/areas" className="underline" style={{ color: "oklch(0.62 0.22 230)" }}>areas we service across Victoria</Link>.</Body></div></div></section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container"><SectionHeading>How Much Does Commercial Cleaning Cost in Melbourne?</SectionHeading><div className="max-w-4xl space-y-5"><Body>Commercial cleaning doesn't come at one fixed price. A small office, a busy shop and a large warehouse take different amounts of time and need different kinds of work.</Body><Body>When preparing a quote, we look at the size and layout of your property, because more floor space and more rooms usually mean more cleaning time. We also consider the type of business: an office, retail store, and warehouse all have their own cleaning priorities.</Body><Body>How often you need us matters too. Regular visits are planned differently from a one-off clean. The tasks themselves affect the price - everyday vacuuming, mopping, and washroom cleaning aren't the same as detailed deep cleaning. Flooring also makes a difference, since carpet, tiles and other surfaces need suitable methods. Finally, we take account of building access, working hours and any extra services such as carpet steam cleaning or specialist floor care.</Body><Body>Nexus Facility Group offers free quotes for commercial cleaning. Tell us about your property, what needs doing and how often you'd like it cleaned. We'll provide a quote based on the job rather than a one-size-fits-all rate.</Body><Body>You can read the general pricing information at <Link href="/pricing" className="underline" style={{ color: "oklch(0.62 0.22 230)" }}>pricing</Link>.</Body></div><div className="mt-10"><CTA>Get a Free Quote for Your Workplace</CTA></div></div></section>

      <section className="border-b py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container"><SectionHeading>Frequently Asked Questions</SectionHeading><div className="grid gap-9 md:grid-cols-2">
        <FAQ question="What does commercial cleaning include?">Commercial cleaning generally covers workstations, reception areas, floors, staff kitchens, washrooms and shared spaces. Common tasks include dusting, vacuuming, mopping, wiping surfaces and removing general waste. Your quote sets out the work included for your property.</FAQ>
        <FAQ question="Do you clean commercial properties in Clyde North, Cranbourne and Pakenham?">Yes. Our advertised service areas include Clyde North, Clyde, Cranbourne, Pakenham and nearby suburbs including Koo Wee Rup and Tooradin. We can confirm availability for your exact address when you enquire.</FAQ>
        <FAQ question="Can I book commercial cleaning on the Mornington Peninsula?">Yes. Our coverage includes Mornington, Mount Martha, Dromana, Hastings, Somerville, Baxter and Bittern. We also list Wonthaggi separately within the Bass Coast region.</FAQ>
        <FAQ question="How much does commercial cleaning cost in Melbourne?">The price depends on your property's size, cleaning frequency, floor surfaces, and the tasks required. A small office and a large warehouse won't cost the same. We offer free quotes based on the details of your job. A published starting rate should only be added here if Nexus confirms it applies specifically to commercial cleaning.</FAQ>
        <FAQ question="Do you clean offices, shops, medical centres and warehouses?">Yes. We offer cleaning for offices, retail stores, non-clinical areas of medical centres, warehouses and other workplaces. Clinical or specialist work is assessed separately before it is included.</FAQ>
        <FAQ question="Do you cover areas outside Melbourne?">Yes. Nexus advertises service coverage across Victoria, including the Geelong, Ballarat, Bendigo and Gippsland regions. Contact us to confirm availability at your property.</FAQ>
        <FAQ question="Is Nexus Facility Group licensed and insured?">Nexus states that it is fully insured and holds a Victorian labour hire licence. Its website displays RACV insurance and Labour Hire Authority information. Please request current documents when you need to verify cover or licensing for your business.</FAQ>
      </div></div></section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container text-center"><SectionHeading>Let's Get Your Workplace Looking Its Best</SectionHeading><div className="mx-auto max-w-3xl space-y-4"><Body>Whether you're opening a new office, managing a retail store or looking for a more practical way to keep a larger property clean, we're here to help.</Body><Body>Tell us where your business is, what needs attention, and how often you need cleaning. We'll talk through the next step and provide a free quote.</Body></div><div className="mx-auto mt-10 grid max-w-xl gap-2 text-sm" style={{ color: "oklch(0.78 0.05 230)" }}><div>Nexus Facility Group - Commercial Cleaning Melbourne</div><a href="tel:0477376440" className="hover:underline">Phone: {PHONE}</a><a href="tel:0404934544" className="hover:underline">Alternative phone: {SECONDARY_PHONE}</a><a href={`mailto:${EMAIL}`} className="hover:underline">Email: {EMAIL}</a></div><div className="mt-9"><CTA>Get a Free Commercial Cleaning Quote</CTA></div></div></section>
    </div>
  );
}
