import { Link } from "wouter";
import {
  MapPin,
  ArrowRight,
  CheckCircle,
  Building2,
  Phone,
} from "lucide-react";

const REGIONS = [
  {
    name: "Melbourne CBD & Inner City",
    description:
      "Nexus Facility Group provides premium commercial cleaning across Melbourne's central business district and surrounding inner-city suburbs. From high-rise office towers to boutique retail spaces, medical clinics, and hospitality venues — we deliver consistent, reliable cleaning services in the heart of Melbourne.",
    suburbs: [
      "Melbourne CBD", "Southbank", "Docklands", "South Melbourne", "North Melbourne",
      "West Melbourne", "East Melbourne", "Carlton", "Fitzroy", "Collingwood",
      "Richmond", "Cremorne", "South Yarra", "Prahran", "Windsor",
      "St Kilda", "Albert Park", "Port Melbourne", "Parkville", "Brunswick",
    ],
  },
  {
    name: "Northern Melbourne",
    description:
      "Our northern corridor coverage extends from the inner suburbs through to Melbourne's growing northern fringe. We service childcare centres, medical practices, warehouses, and commercial offices throughout the northern suburbs — delivering the same premium standard regardless of location.",
    suburbs: [
      "Coburg", "Pascoe Vale", "Glenroy", "Broadmeadows", "Campbellfield",
      "Fawkner", "Reservoir", "Preston", "Thornbury", "Northcote",
      "Bundoora", "Mill Park", "South Morang", "Mernda", "Doreen",
      "Epping", "Wollert", "Craigieburn", "Mickleham", "Kalkallo",
      "Roxburgh Park", "Meadow Heights", "Dallas", "Jacana", "Gladstone Park",
      "Tullamarine", "Greenvale", "Attwood", "Westmeadows", "Thomastown",
      "Lalor", "Whittlesea", "Kinglake", "Hurstbridge", "Diamond Creek",
      "Eltham", "Research", "Montmorency", "Greensborough", "Watsonia",
      "Heidelberg", "Ivanhoe", "Viewbank", "Rosanna", "Macleod",
    ],
  },
  {
    name: "Western Melbourne",
    description:
      "Nexus Facility Group is proud to serve Melbourne's thriving western suburbs — one of Australia's fastest-growing industrial and residential corridors. From large-scale warehouse cleaning in Truganina and Laverton North to childcare centre sanitisation in Point Cook and Tarneit, we understand the unique demands of the west.",
    suburbs: [
      "Footscray", "Yarraville", "Seddon", "Williamstown", "Newport",
      "Altona", "Altona North", "Altona Meadows", "Laverton", "Laverton North",
      "Truganina", "Tarneit", "Wyndham Vale", "Werribee", "Hoppers Crossing",
      "Point Cook", "Williams Landing", "Manor Lakes", "Melton", "Melton South",
      "Melton West", "Brookfield", "Kurunjang", "Bacchus Marsh", "Darley",
      "Caroline Springs", "Burnside Heights", "Hillside", "Taylors Hill", "Sydenham",
      "Deer Park", "St Albans", "Sunshine", "Sunshine West", "Sunshine North",
      "Braybrook", "Maidstone", "Maribyrnong", "Moonee Ponds", "Essendon",
      "Essendon North", "Niddrie", "Keilor", "Keilor East", "Keilor Park",
      "Keilor Downs", "Airport West", "Avondale Heights", "Aberfeldie", "Ascot Vale",
    ],
  },
  {
    name: "South-Eastern Melbourne",
    description:
      "Our south-eastern coverage spans from the bustling commercial hubs of Dandenong and Springvale through to the residential growth corridors of Cranbourne and Pakenham. We provide tailored cleaning solutions for medical centres, offices, childcare facilities, and industrial premises throughout Melbourne's south-east.",
    suburbs: [
      "Dandenong", "Dandenong South", "Dandenong North", "Noble Park", "Springvale",
      "Springvale South", "Keysborough", "Cheltenham", "Mentone", "Moorabbin",
      "Bentleigh", "Bentleigh East", "Oakleigh", "Oakleigh South", "Clayton",
      "Clayton South", "Mulgrave", "Wheelers Hill", "Glen Waverley", "Mount Waverley",
      "Chadstone", "Hughesdale", "Huntingdale", "Monash", "Notting Hill",
      "Cranbourne", "Cranbourne East", "Cranbourne West", "Cranbourne North", "Clyde",
      "Clyde North", "Berwick", "Beaconsfield", "Officer", "Pakenham",
      "Narre Warren", "Narre Warren South", "Narre Warren North", "Hallam", "Endeavour Hills",
      "Doveton", "Eumemmerring", "Hampton Park", "Lynbrook", "Lyndhurst",
      "Carrum Downs", "Skye", "Frankston", "Frankston North", "Frankston South",
      "Seaford", "Langwarrin", "Karingal", "Patterson Lakes", "Bonbeach",
    ],
  },
  {
    name: "Eastern Melbourne",
    description:
      "From the established commercial precincts of Box Hill and Ringwood to the leafy suburbs of the Yarra Ranges, Nexus Facility Group delivers professional cleaning across Melbourne's eastern corridor. We service offices, medical centres, schools, and retail spaces with precision and reliability.",
    suburbs: [
      "Hawthorn", "Kew", "Balwyn", "Balwyn North", "Camberwell",
      "Canterbury", "Surrey Hills", "Box Hill", "Box Hill North", "Box Hill South",
      "Blackburn", "Blackburn North", "Blackburn South", "Nunawading", "Mitcham",
      "Ringwood", "Ringwood East", "Ringwood North", "Croydon", "Croydon Hills",
      "Croydon North", "Croydon South", "Mooroolbark", "Lilydale", "Mount Evelyn",
      "Chirnside Park", "Kilsyth", "Bayswater", "Bayswater North", "Boronia",
      "Ferntree Gully", "Upper Ferntree Gully", "Knoxfield", "Wantirna", "Wantirna South",
      "Scoresby", "Rowville", "Lysterfield", "Vermont", "Vermont South",
      "Glen Iris", "Ashburton", "Ashwood", "Burwood", "Burwood East",
      "Forest Hill", "Doncaster", "Doncaster East", "Templestowe", "Templestowe Lower",
      "Bulleen", "Donvale", "Park Orchards", "Warrandyte", "Eltham North",
    ],
  },
  {
    name: "Bayside & Mornington Peninsula",
    description:
      "Nexus Facility Group extends its premium cleaning solutions to Melbourne's prestigious bayside suburbs and the Mornington Peninsula. We understand the high standards expected by businesses in these areas — from boutique medical practices to corporate offices with bay views.",
    suburbs: [
      "Brighton", "Brighton East", "Hampton", "Sandringham", "Black Rock",
      "Beaumaris", "Mordialloc", "Aspendale", "Edithvale", "Chelsea",
      "Chelsea Heights", "Carrum", "Mornington", "Mount Martha", "Mount Eliza",
      "Baxter", "Somerville", "Tyabb", "Hastings", "Bittern",
      "Rosebud", "Dromana", "Safety Beach", "Rye", "Blairgowrie",
      "Sorrento", "Portsea", "Flinders", "Red Hill", "Balnarring",
    ],
  },
  {
    name: "Geelong & Surf Coast",
    description:
      "Our service coverage extends beyond Melbourne to Geelong — Victoria's second-largest city — and the surrounding Surf Coast region. We provide the same high-quality commercial, industrial, and healthcare cleaning that Melbourne businesses trust, now available to Geelong's growing business community.",
    suburbs: [
      "Geelong", "Geelong West", "Newtown", "Belmont", "Highton",
      "Grovedale", "Waurn Ponds", "Armstrong Creek", "Torquay", "Jan Juc",
      "Ocean Grove", "Barwon Heads", "Lara", "Corio", "Norlane",
      "North Geelong", "Bell Park", "Bell Post Hill", "Hamlyn Heights", "Herne Hill",
      "Newcomb", "Whittington", "Leopold", "Drysdale", "Clifton Springs",
      "Portarlington", "Queenscliff", "Point Lonsdale", "Anglesea", "Aireys Inlet",
    ],
  },
  {
    name: "Gippsland & Latrobe Valley",
    description:
      "Nexus Facility Group proudly serves the Gippsland region and Latrobe Valley, providing professional cleaning solutions to industrial facilities, healthcare centres, offices, and educational institutions across this vital regional corridor.",
    suburbs: [
      "Warragul", "Drouin", "Moe", "Morwell", "Traralgon",
      "Sale", "Bairnsdale", "Wonthaggi", "Inverloch", "Phillip Island",
      "Korumburra", "Leongatha", "Foster", "Lakes Entrance", "Cowes",
      "Churchill", "Newborough", "Yallourn North", "Trafalgar", "Yarragon",
    ],
  },
  {
    name: "Ballarat & Central Highlands",
    description:
      "We extend our professional facility services to Ballarat and the Central Highlands region. Businesses in this growing regional centre benefit from the same rigorous cleaning standards, compliance focus, and reliability that our Melbourne clients have come to expect.",
    suburbs: [
      "Ballarat", "Ballarat East", "Ballarat North", "Wendouree", "Sebastopol",
      "Buninyong", "Mount Helen", "Alfredton", "Delacombe", "Lucas",
      "Creswick", "Daylesford", "Hepburn Springs", "Clunes", "Smythesdale",
      "Ballan", "Gordon", "Bacchus Marsh", "Melton", "Gisborne",
    ],
  },
  {
    name: "Bendigo & Goldfields",
    description:
      "Nexus Facility Group provides comprehensive cleaning solutions to Bendigo and the surrounding Goldfields region. From heritage commercial buildings to modern healthcare facilities and industrial sites, we deliver professional results across this important regional centre.",
    suburbs: [
      "Bendigo", "Kangaroo Flat", "Eaglehawk", "Strathdale", "Flora Hill",
      "Epsom", "Huntly", "Maiden Gully", "Golden Square", "Long Gully",
      "Castlemaine", "Kyneton", "Woodend", "Heathcote", "Rochester",
      "Echuca", "Moama", "Maryborough", "Dunolly", "Maldon",
    ],
  },
  {
    name: "Shepparton & North-East Victoria",
    description:
      "Our service network reaches into Shepparton and North-East Victoria, providing professional facility cleaning to agricultural businesses, food processing plants, medical centres, and commercial offices across this productive regional area.",
    suburbs: [
      "Shepparton", "Mooroopna", "Tatura", "Kyabram", "Cobram",
      "Wangaratta", "Benalla", "Seymour", "Euroa", "Mansfield",
      "Wodonga", "Albury", "Myrtleford", "Bright", "Mount Beauty",
      "Yarrawonga", "Numurkah", "Nathalia", "Nagambie", "Kilmore",
    ],
  },
];

export default function Page() {
  const totalSuburbs = REGIONS.reduce((acc, r) => acc + r.suburbs.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="container text-center max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "oklch(0.62 0.22 230 / 0.15)", border: "1px solid oklch(0.62 0.22 230 / 0.3)" }}
          >
            <MapPin className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.62 0.22 230)" }}>
              Servicing All of Victoria
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            COMMERCIAL CLEANING
            <br />
            <span style={{ color: "oklch(0.62 0.22 230)" }}>ACROSS VICTORIA</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ color: "oklch(0.82 0.04 230)" }}>
            Nexus Facility Group delivers professional commercial, domestic, industrial, and healthcare cleaning to over <strong style={{ color: "oklch(0.97 0.01 240)" }}>{totalSuburbs}+ suburbs</strong> across Victoria. From Melbourne CBD to regional centres — wherever your facility is, we're there.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "oklch(0.78 0.05 230)" }}>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: "oklch(0.72 0.19 150)" }} />
              Same-Day Quotes Available
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
              All Industries Covered
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
              Metro & Regional Victoria
            </span>
          </div>
        </div>
      </section>

      {/* Regions */}
      {REGIONS.map((region) => (
        <section key={region.name} className="py-10">
          <div className="container max-w-6xl">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.14 0.04 245 / 0.9)",
                border: "1px solid oklch(0.62 0.22 230 / 0.12)",
              }}
            >
              {/* Region Header */}
              <div
                className="px-8 py-6"
                style={{ borderBottom: "1px solid oklch(0.62 0.22 230 / 0.1)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5" style={{ color: "oklch(0.62 0.22 230)" }} />
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {region.name}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed max-w-4xl" style={{ color: "oklch(0.78 0.05 230)" }}>
                  {region.description}
                </p>
              </div>

              {/* Suburbs Grid */}
              <div className="px-8 py-6">
                <div className="flex flex-wrap gap-2">
                  {region.suburbs.map((suburb) => (
                    <span
                      key={suburb}
                      className="inline-block px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:scale-105 cursor-default"
                      style={{
                        background: "oklch(0.62 0.22 230 / 0.08)",
                        color: "oklch(0.82 0.04 230)",
                        border: "1px solid oklch(0.62 0.22 230 / 0.15)",
                      }}
                    >
                      {suburb}
                    </span>
                  ))}
                </div>
              </div>

              {/* Region CTA */}
              <div
                className="px-8 py-4 flex flex-wrap items-center justify-between gap-4"
                style={{ borderTop: "1px solid oklch(0.62 0.22 230 / 0.08)", background: "oklch(0.10 0.04 245 / 0.5)" }}
              >
                <p className="text-xs" style={{ color: "oklch(0.65 0.05 230)" }}>
                  Need cleaning services in {region.name.split(" &")[0]}? Get a free quote today.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: "oklch(0.62 0.22 230)" }}
                >
                  Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Services We Provide Section */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SERVICES AVAILABLE IN ALL AREAS
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "oklch(0.78 0.05 230)" }}>
              Regardless of your location across Victoria, Nexus Facility Group delivers the full range of our professional cleaning solutions to your door.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Commercial Office Cleaning",
              "Domestic & Residential Cleaning",
              "Industrial & Warehouse Cleaning",
              "Medical Centre Cleaning",
              "Childcare Centre Cleaning",
              "End of Lease Cleaning",
              "Carpet Steam Cleaning",
              "Window Cleaning",
              "Pressure Washing",
              "Floor Scrubbing & Polishing",
              "Antibacterial Fogging",
              "General Maintenance Cleaning",
            ].map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{ background: "oklch(0.14 0.04 245 / 0.8)", border: "1px solid oklch(0.62 0.22 230 / 0.1)" }}
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.72 0.19 150)" }} />
                <span className="text-sm font-medium" style={{ color: "oklch(0.85 0.04 230)" }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <div
            className="rounded-2xl p-10"
            style={{
              background: "oklch(0.14 0.04 245 / 0.9)",
              border: "1px solid oklch(0.62 0.22 230 / 0.2)",
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              DON'T SEE YOUR SUBURB?
            </h2>
            <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: "oklch(0.82 0.04 230)" }}>
              Our coverage is constantly expanding. If your suburb isn't listed above, contact us anyway — chances are we already service your area or can arrange coverage for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                style={{
                  background: "oklch(0.62 0.22 230)",
                  color: "oklch(0.98 0.01 240)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:0477376440"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                style={{
                  background: "transparent",
                  color: "oklch(0.62 0.22 230)",
                  border: "2px solid oklch(0.62 0.22 230)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                <Phone className="w-4 h-4" />
                Call 0477 376 440
              </a>
            </div>
            <p className="text-xs mt-6" style={{ color: "oklch(0.55 0.05 230)" }}>
              We service all of metropolitan Melbourne and major regional centres across Victoria. Same-day quotes available for most locations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
