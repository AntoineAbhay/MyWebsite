import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./aboutme.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Chip from "../components/chip"
import RepositoryCard from "../components/repositoryCard"

const EXPERIENCES = [
  {
    title: "Fullstack - Hiresweet",
    location: "Région de Paris, France",
    companyLink: "https://hiresweet.com/",
    icon: "hiresweetImage",
    excerpt:
      "Développement de l'application client d'hiresweet et des outils internes utilisant React en front, NodeJs et MongoDB en back ainsi que des API REST et GraphQL.",
    skills: [
      { text: "MongoDB", backgroundColor: "#13aa52", color: "white" },
      { text: "Node.js", backgroundColor: "#026e00", color: "white" },
      { text: "GraphQL", backgroundColor: "#E10098", color: "black" },
      { text: "React", backgroundColor: "#61dafb", color: "black" },
      { text: "AWS", backgroundColor: "#f8991d", color: "black" },
      { text: "Terraform", backgroundColor: "#623ce4", color: "white" },
      { text: "CircleCI", backgroundColor: "#161616", color: "white" },
      { text: "Docker", backgroundColor: "#0091e2", color: "white" },
    ],
  },

  {
    title: "Fullstack - Ayuda (stage)",
    location: "Sydney, New South Wales, Australia",
    companyLink: "https://broadsign.com/ayuda/",
    icon: "ayudaImage",
    excerpt:
      "Développement d'un logiciel de gestion des affichages publicitaires utilisant C# et jQuery. Personnalisation de contrats et factures.",
    skills: [
      { text: "SQL", backgroundColor: "#006cc1", color: "white" },
      { text: "C#", backgroundColor: "#38225d", color: "white" },
      { text: "JQuery", backgroundColor: "#b3d4fc", color: "black" },
    ],
  },
  {
    title: "Fullstack - Homerez (stage)",
    location: "Région de Paris, France",
    companyLink: "https://www.homerez.fr/",
    icon: "homerezImage",
    excerpt:
      "Développement des différentes applications web d'Homerez (CRM, plateforme de réservation) basées sur des technologies Javascript (NodeJS, AngularJS) et MongoDB.",
    skills: [
      { text: "MongoDB", backgroundColor: "#13aa52", color: "white" },
      { text: "Node.js", backgroundColor: "#026e00", color: "white" },
      { text: "AngularJS", backgroundColor: "#de0032", color: "white" },
    ],
  },
]

const EDUCATION = [
  {
    title: "École Centrale de Lyon",
    location: "Région de Lyon, France",
    companyLink: "https://www.ec-lyon.fr/",
    icon: "eclImage",
    excerpt: "Formation d'ingénieur généraliste, option informatique.",
    skills: [
      { text: "Python", backgroundColor: "#ffd343", color: "black" },
      { text: "Javascript", backgroundColor: "#f7df1e", color: "black" },
      { text: "SQL", backgroundColor: "#006cc1", color: "white" },
    ],
  },
]

const Experience = ({ data, title, excerpt, icon, companyLink, skills }) => (
  <div className={styles.experience}>
    <a target="__blank" rel="noopener noreferer" href={companyLink}>
      <div className={styles.experienceHeader}>
        <Img fixed={data[icon].childImageSharp.fixed} className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
      </div>
    </a>
    <div className={styles.description}>
      <p className={styles.excerpt}>{excerpt}</p>
      <div className={styles.skills}>
        {(skills || []).map(({ text, backgroundColor, color }, index) => (
          <Chip
            key={index}
            text={text}
            backgroundColor={backgroundColor}
            color={color}
          />
        ))}
      </div>
    </div>
  </div>
)

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const ResumePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      hiresweetImage: file(relativePath: { eq: "hiresweet.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      ayudaImage: file(relativePath: { eq: "ayuda.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      homerezImage: file(relativePath: { eq: "homerez.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      eclImage: file(relativePath: { eq: "ecl.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      github {
        viewer {
          repositories(first: 100, affiliations: [OWNER]) {
            nodes {
              name
              description
              url
              languages(first: 10) {
                nodes {
                  color
                  name
                }
              }
              pushedAt
              repositoryTopics(first: 100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const sortedRepositories = (
    data?.github?.viewer?.repositories?.nodes || []
  ).sort((repo1, repo2) => (repo1.pushedAt < repo2.pushedAt ? 1 : -1))
  return (
    <div className={styles.background}>
      <Layout location={location}>
        <SEO title="Resume" />
        <h2>Expériences</h2>
        {EXPERIENCES.map(
          ({ title, location, companyLink, icon, excerpt, skills }, index) => (
            <Experience
              key={index}
              data={data}
              title={title}
              location={location}
              companyLink={companyLink}
              icon={icon}
              excerpt={excerpt}
              skills={skills}
            />
          )
        )}
        <h2>Formation</h2>
        {EDUCATION.map(
          ({ title, location, companyLink, icon, excerpt, skills }, index) => (
            <Experience
              key={index}
              data={data}
              title={title}
              location={location}
              companyLink={companyLink}
              icon={icon}
              excerpt={excerpt}
              skills={skills}
            />
          )
        )}
        <h2>Github</h2>
        <div className={styles.repositoriesContainer}>
          {sortedRepositories.map((repository, index) => (
            <RepositoryCard key={index} repository={repository} />
          ))}
        </div>
      </Layout>
    </div>
  )
}

export default ResumePage
