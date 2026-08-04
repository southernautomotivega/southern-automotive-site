import { SectionEyebrow } from "@/components/Shared";
import { getTeam } from "@/lib/vehicles";

export const metadata = {
  title: "Meet the Team | Southern Automotive Group",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <section className="py-16 bg-bg font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow>Who you&apos;ll talk to</SectionEyebrow>
        <h2 className="font-display text-3xl font-semibold mb-2 text-navy900">Meet the Team</h2>
        <p className="text-sm mb-10 max-w-xl text-muted">
          Small by design — you&apos;ll deal directly with the people who own the place.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {team.map((person) => (
            <div key={person.id} className="p-6 flex flex-col gap-3 rounded-[10px] shadow-card bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-navy800 to-navy600">
                <span className="font-display text-xl font-semibold text-brandGold">{person.initials}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy900">{person.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-brandOrange">{person.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
