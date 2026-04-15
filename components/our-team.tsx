'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import RewindTransition from './RewindTransition'

// ─── Department definitions per tenure ───────────────────────────────────────

const departments2627 = [
  { id: 'faculty', name: 'Faculty Coordinators' },
  { id: 'board', name: 'Board' },
  { id: 'projects', name: 'Projects' },
  { id: 'rnd', name: 'Research & Development' },
  { id: 'technical', name: 'Technical' },
  { id: 'design', name: 'Design' },
  { id: 'management', name: 'Management' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'publicity', name: 'Publicity' },
  { id: 'outreach', name: 'Outreach' },
]

const departments2526 = [
  { id: 'faculty', name: 'Faculty Coordinators' },
  { id: 'board', name: 'Board' },
  { id: 'product', name: 'Product Development & Manufacturing' },
  { id: 'technical', name: 'Technical' },
  { id: 'design', name: 'Design & Content' },
  { id: 'operations', name: 'Operations & Logistics' },
  { id: 'social', name: 'Social Media & Outreach' },
  { id: 'finance', name: 'Finance' },
]

// ─── Team members for 2026-27 ────────────────────────────────────────────────

const teamMembers2627 = [
  // Faculty Coordinators
  { name: 'Dr Velmathi G', role: 'Faculty Coordinator', department: 'faculty' },
  { name: 'Dr David Raj Micheal', role: 'Faculty Coordinator', department: 'faculty' },
  // Board
  { name: 'Vedant Ghankhede', role: 'Chairperson', department: 'board' },
  { name: 'R Sudharshan', role: 'Vice-Chairperson', department: 'board' },
  { name: 'Om Wakade', role: 'Secretary', department: 'board' },
  // Projects
  { name: 'Amritansh Jaiswal', role: 'Projects Head', department: 'projects' },
  // Research & Development
  { name: 'Tanush Karkhanis', role: 'Head', department: 'rnd' },
  { name: 'Sree Shiv Lajil', role: 'Co-Head', department: 'rnd' },
  // Technical
  { name: 'Vignesh Jaisankar', role: 'Head', department: 'technical' },
  { name: 'Aditya Vaswani', role: 'Co-Head', department: 'technical' },
  // Design
  { name: 'Rithika Baheti', role: 'Design Head', department: 'design' },
  // Management
  { name: 'Dhruv Nalwaya', role: 'Head', department: 'management' },
  { name: 'Parth Mishra', role: 'Co-Head', department: 'management' },
  // Editorial
  { name: 'Sanskar Dharmadhikari', role: 'Editorial Head', department: 'editorial' },
  // Publicity
  { name: 'Swapnil Jaiswal', role: 'Publicity Head', department: 'publicity' },
  // Outreach
  { name: 'Shrish Ahankari', role: 'Head', department: 'outreach' },
  { name: 'Eklavya Nayyar', role: 'Co-Head', department: 'outreach' },
]

// ─── Team members for 2025-26 ───────────────────────────────────────────────

const teamMembers2526 = [
  // Faculty Coordinators
  { name: 'Dr Velmathi G', role: 'Faculty Coordinator', department: 'faculty' },
  { name: 'Dr David Raj Micheal', role: 'Faculty Coordinator', department: 'faculty' },
  // Board
  { name: 'Ranvir Deshmukh', role: 'General Secretary', department: 'board' },
  { name: 'Piyush Arora', role: 'Joint Secretary', department: 'board' },
  { name: 'Arpita Kumar', role: 'Treasurer', department: 'board' },
  { name: 'Agrim Gusain', role: 'Board Member', department: 'board' },
  { name: 'Abhinav Vasudevan', role: 'Board Member', department: 'board' },
  // Technical
  { name: 'Sekkappan Vinaiteerthan', role: 'Technical Head', department: 'technical' },
  { name: 'Arzaan Wadia', role: 'Technical Head', department: 'technical' },
  // Product
  { name: 'Mohammed Faheem', role: 'Product Head', department: 'product' },
  { name: 'Srinnath Krishnan', role: 'Product Head', department: 'product' },
  // Operations
  { name: 'Advait Pande', role: 'Operations Head', department: 'operations' },
  { name: 'Suryansh Rai', role: 'Operations Head', department: 'operations' },
  // Design
  { name: 'Adithi Sharathkumar', role: 'Design Head', department: 'design' },
  { name: 'Jiya Sharma', role: 'Design Head', department: 'design' },
  // Social Media
  { name: 'Saksham Rao', role: 'Social Media Head', department: 'social' },
  { name: 'Siya Srivastava', role: 'Social Media Head', department: 'social' },
  // Finance
  { name: 'Harshwardhan Rai Malik', role: 'Finance Head', department: 'finance' },
]

export default function OurTeam() {
  const [tenure, setTenure] = useState<'2026-27' | '2025-26'>('2026-27')
  const [isRewinding, setIsRewinding] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const departments = tenure === '2026-27' ? departments2627 : departments2526
  const teamMembers = tenure === '2026-27' ? teamMembers2627 : teamMembers2526

  const [activeDepartment, setActiveDepartment] = useState(departments[0].id)

  const handleTenureSwitch = useCallback((target: '2026-27' | '2025-26') => {
    if (tenure === target || isRewinding) return
    setIsRewinding(true)
  }, [tenure, isRewinding])

  const handleTransitionPeak = () => {
    const target = tenure === '2026-27' ? '2025-26' : '2026-27'
    setTenure(target)
    const newDepts = target === '2026-27' ? departments2627 : departments2526
    setActiveDepartment(newDepts[0].id)

    setTimeout(() => {
      setIsRewinding(false)
    }, 500)
  }

  const grouped = departments.map(dept => {
    const members = teamMembers.filter(m => m.department === dept.id)
    return { id: dept.id, dept: dept.name, members }
  })

  const tenureLabel = tenure === '2026-27' ? '2026–27' : '2025–26'
  const altTenureLabel = tenure === '2026-27' ? '2025–26' : '2026–27'
  const altTenureKey = tenure === '2026-27' ? '2025-26' : '2026-27'

  return (
    <section id="our-team" className="py-16 md:py-24" ref={sectionRef}>
      <RewindTransition
        trigger={isRewinding}
        onTransitionPeak={handleTransitionPeak}
        duration={500}
        persistedFilter={tenure === '2025-26'}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white leading-tight">
              Meet the team that<br />makes the <span className="italic text-[#FFD700]">magic</span> happen
            </h1>

            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5">
              <span className="text-[#FFD700] text-sm font-semibold tracking-wide">
                Core Committee — Tenure {tenureLabel}
              </span>
            </div>

            <p className="text-gray-400 text-base md:text-lg mb-6">
              Meet our diverse team of world-class creators, designers, and problem solvers.
            </p>

            <button
              onClick={() => handleTenureSwitch(altTenureKey as '2025-26' | '2026-27')}
              disabled={isRewinding}
              className={cn(
                "group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300",
                "border border-[#FFD700]/40 hover:border-[#FFD700] bg-black/60 hover:bg-[#FFD700]/10",
                "text-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]",
                isRewinding && "opacity-50 cursor-not-allowed"
              )}
            >
              <svg
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  tenure === '2026-27'
                    ? "group-hover:-translate-x-0.5 group-hover:scale-110"
                    : "group-hover:translate-x-0.5 group-hover:scale-110 rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
              <span>
                {isRewinding ? 'Rewinding…' : `View ${altTenureLabel} Core`}
              </span>
            </button>
          </div>

          {/* Department tabs */}
          <div className="mt-8">
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="w-full max-w-5xl px-2">
                <div className="hidden md:flex flex-wrap justify-center gap-3 p-1">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setActiveDepartment(dept.id)}
                      className={cn(
                        "w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] px-4 py-3 rounded-full text-sm transition-all duration-300 font-bold tracking-tight text-center",
                        activeDepartment === dept.id
                          ? "bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                          : "text-gray-400 bg-gray-900/60 border border-gray-800 hover:bg-gray-800/80 hover:text-white"
                      )}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>

                <div className="md:hidden overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 p-1 min-w-max">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => setActiveDepartment(dept.id)}
                        className={cn(
                          "px-5 py-2.5 rounded-full text-xs whitespace-nowrap transition-colors font-bold",
                          activeDepartment === dept.id
                            ? "bg-[#FFD700] text-black"
                            : "text-gray-400 bg-gray-900/60 border border-gray-800 hover:bg-gray-800/50"
                        )}
                      >
                        {dept.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Members grid */}
            <div className="space-y-12 md:space-y-12">
              {grouped
                .filter(g => activeDepartment === g.id)
                .map(({ dept, members, id }) => (
                  <div key={dept} id={id} className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-6 font-serif text-center">
                      {dept}
                    </h2>
                    <div className="w-full max-w-2xl space-y-4 md:space-y-4">
                      {members.map((member, idx) => (
                        <div
                          key={member.name + idx}
                          className={cn(
                            "text-center px-4 py-3 rounded-lg",
                            idx < 2 ? "bg-[#FFD700]/10 border border-[#FFD700]/20" : "bg-gray-800/30"
                          )}
                        >
                          <div className={cn(
                            "font-medium",
                            idx < 2 ? "text-[#FFD700]" : "text-white"
                          )}>
                            {member.name}
                          </div>
                          <div className={cn(
                            "text-sm",
                            idx < 2 ? "text-gray-200" : "text-gray-400"
                          )}>
                            {member.role}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </RewindTransition>
    </section>
  )
}
