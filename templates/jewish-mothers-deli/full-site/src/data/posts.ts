export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string // ISO string
  heroImage: string
}

export interface BlogPost extends BlogPostMeta {
  content: string[] // paragraphs
}

export const posts: BlogPost[] = [
  {
    slug: 'why-the-jewish-mothers-deli',
    title: "Why The Jewish Mother's Deli",
    excerpt:
      "A personal note from Sid about bringing The Jewish Mother's Deli to Williamsburg and the women who inspired it.",
    author: 'Sid Hall',
    date: new Date().toISOString(),
    heroImage: '/images/jewish-mothers-deli-williamsburg-va.jpg',
    content: [
      "Hi friends,",
      "I can’t put into words how meaningful it is for me to bring The Jewish Mother’s Deli to Williamsburg — my hometown. This town shaped who I am, and now I get to bring something back that’s built on the foundation of family, tradition, and a lot of love.",
      "Now — about the name. A lot of folks have asked if we’re connected to The Jewish Mother that used to be around here, and the answer is no. This is something entirely new, and it comes from a much more personal place for me.",
      "The name The Jewish Mother’s Deli is more than a clever nod — it’s a tribute. A tribute to the women who raised me, shaped me, and in many ways defined the kind of person I strive to be. My mother, Norma, who has always been my biggest supporter and fiercest critic, often in the same breath. My grandmothers, Jewel and Joanne — and while Joanne isn’t Jewish, she is every bit my grandmother and every bit of the strong motherly presence I want to honor here. My great aunt, Nancy, who carried herself with the kind of quiet strength that left a lasting mark, and my aunt, Leslie, whose mix of warmth, wit, and honesty continues to inspire me.",
      "These women weren’t just family — they were forces of nature. They taught me the value of showing up for the people you love, even when it’s inconvenient. They taught me that sometimes love looks like comfort, and sometimes it looks like tough truth. They made sure I never left the table hungry, and they reminded me (often loudly) when I needed to do better.",
      "To me, that’s what “the Jewish mother” really represents. She’s the one who shows up when you need her most, no questions asked. She’s the one who tells you the truth even when you don’t want to hear it — because she loves you enough to say it. She’s the one who insists you eat, again and again and again, because feeding you is her way of taking care of you. And she’s the one whose love, somehow, is both fierce and tender all at once — the kind of love that stays with you for a lifetime.",
      "That spirit is what I want to capture with this deli. It’s not just about bagels, schmears, pastrami, and whitefish (though of course there will be plenty of those). It’s about creating a space that feels like the embrace of family. A place where tradition and comfort meet, where there’s laughter, honesty, and maybe even a little guilt — but always with love at the center of it all.",
      "I can’t wait to open the doors and welcome you in. Until then, thank you for letting me share this dream with you. From my family to yours — here’s to strong mothers, strong community, and all the Manischewitz your heart desires.",
      "With love,",
      "Sid\n\nThe Jewish Mother’s Deli",
    ],
  },
]

export function getPosts(): BlogPostMeta[] {
  return posts.map(({ content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}


