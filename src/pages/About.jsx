// src/pages/About.jsx
import { useEffect, useState } from 'react'
import client from '../sanity/client'
import { PortableText } from '@portabletext/react'

export default function About() {
  const [page, setPage] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "aboutPage"][0]{
        heroTitle,
        heroSubtitle,
        "heroImageUrl": heroImage.asset->url,
        body[],
        team[]{
          name,
          role,
          "photoUrl": photo.asset->url
        }
      }`)
      .then((data) => setPage(data))
      .catch((err) => console.error('Sanity fetch error:', err))
  }, [])

  if (!page) {
    return <div className="text-center py-20">Loading…</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        {page.heroImageUrl && (
          <img
            src={page.heroImageUrl}
            alt={page.heroTitle}
            className="mx-auto w-full max-h-96 object-cover rounded-md"
          />
        )}
        <h1 className="text-4xl font-bold">{page.heroTitle}</h1>
        <p className="text-lg text-gray-600">{page.heroSubtitle}</p>
      </section>

      {/* Body Rich Text */}
      <section className="prose prose-lg mx-auto">
        <PortableText
          value={page.body}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mt-8">{children}</h2>
              ),
              normal: ({ children }) => (
                <p className="mt-4 leading-relaxed text-gray-700">{children}</p>
              ),
            },
            types: {
              image: ({ value }) => (
                <img
                  src={value.asset.url}
                  alt={value.alt || 'About image'}
                  className="w-full my-6 rounded-lg"
                />
              ),
            },
          }}
        />
      </section>

      {/* Team Grid */}
      {page.team && page.team.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {page.team.map((member, idx) => (
              <div key={idx} className="text-center">
                {member.photoUrl && (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="mx-auto w-32 h-32 object-cover rounded-full mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
