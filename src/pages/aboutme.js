import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./aboutme.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Chip from "../components/chip"
import RepositoryCard from "../components/repositoryCard"

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

      allDataJson {
        edges {
          node {
            experiences {
              companyLink
              excerpt
              icon
              location
              skills {
                backgroundColor
                color
                text
              }
              title
            }
            education {
              companyLink
              excerpt
              icon
              location
              skills {
                backgroundColor
                color
                text
              }
              title
            }
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

  const experiences = data.allDataJson.edges[0].node.experiences || []
  const education = data.allDataJson.edges[0].node.education || []

  const sortedRepositories = (
    data?.github?.viewer?.repositories?.nodes || []
  ).sort((repo1, repo2) => (repo1.pushedAt < repo2.pushedAt ? 1 : -1))
  return (
    <div className={styles.background}>
      <Layout location={location}>
        <SEO title="Resume" />
        <h2>Expériences</h2>
        {experiences.map(
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
        {education.map(
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
