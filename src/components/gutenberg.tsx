// Install dependencies:
// npm install @wordpress/block-serialization-default-parser html-react-parser isomorphic-dompurify

import { parse as parseBlocks } from "@wordpress/block-serialization-default-parser";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import styles from "../styles/gutenberg.module.css"; // Adjust path as needed

// Main Gutenberg Block Renderer Component
const GutenbergRenderer = ({ content }: any) => {
  if (!content) return null;

  // Sanitize the content before parsing
  const postHtml = DOMPurify.sanitize(content);
  const blocks = parseBlocks(postHtml);

  return (
    <div className={styles.gutenbergContent}>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
};

// Individual Block Renderer
const BlockRenderer = ({ block }) => {
  const { blockName, innerHTML, innerBlocks, attrs } = block;

  // Sanitize innerHTML before parsing
  const sanitizedInnerHTML = innerHTML ? DOMPurify.sanitize(innerHTML) : "";

  // Handle blocks with inner blocks (like columns, groups)
  if (innerBlocks && innerBlocks.length > 0) {
    return (
      <div className={`block-${blockName?.replace("core/", "")}`}>
        {sanitizedInnerHTML && <div>{parse(sanitizedInnerHTML)}</div>}
        {innerBlocks.map((innerBlock, index) => (
          <BlockRenderer key={index} block={innerBlock} />
        ))}
      </div>
    );
  }

  // Render specific block types
  switch (blockName) {
    case "core/paragraph":
      return (
        <p className={styles.wpBlockParagraph}>{parse(sanitizedInnerHTML)}</p>
      );

    case "core/heading":
      const HeadingTag = `h${attrs?.level || 2}`;
      return React.createElement(
        HeadingTag,
        {
          className: `${styles.wpBlockHeading} has-text-align-${
            attrs?.textAlign || "left"
          }`,
        },
        parse(sanitizedInnerHTML)
      );

    case "core/image":
      return (
        <figure className="wp-block-image">{parse(sanitizedInnerHTML)}</figure>
      );

    case "core/list":
      const ListTag = attrs?.ordered ? "ol" : "ul";
      return React.createElement(
        ListTag,
        { className: "wp-block-list" },
        parse(sanitizedInnerHTML)
      );

    case "core/quote":
      return (
        <blockquote className="wp-block-quote">
          {parse(sanitizedInnerHTML)}
        </blockquote>
      );

    case "core/code":
      return (
        <pre className="wp-block-code">
          <code>{parse(sanitizedInnerHTML)}</code>
        </pre>
      );

    case "core/html":
      return <div className="wp-block-html">{parse(sanitizedInnerHTML)}</div>;

    case "core/separator":
      return <hr className="wp-block-separator" />;

    case "core/spacer":
      return (
        <div
          className="wp-block-spacer"
          style={{ height: attrs?.height || "100px" }}
        />
      );

    case "core/columns":
      return (
        <div className="wp-block-columns">
          {innerBlocks?.map((column, index) => (
            <BlockRenderer key={index} block={column} />
          ))}
        </div>
      );

    case "core/column":
      return (
        <div className="wp-block-column">
          {innerBlocks?.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>
      );

    case "core/group":
      return (
        <div className="wp-block-group">
          {innerBlocks?.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>
      );

    case "core/media-text":
      return (
        <div className="wp-block-media-text">{parse(sanitizedInnerHTML)}</div>
      );

    case "core/gallery":
      return (
        <figure className="wp-block-gallery">
          {parse(sanitizedInnerHTML)}
        </figure>
      );

    case "core/embed":
    case "core-embed/youtube":
    case "core-embed/twitter":
    case "core-embed/instagram":
      return (
        <figure className="wp-block-embed">{parse(sanitizedInnerHTML)}</figure>
      );

    case null:
    case "":
      // Handle freeform/classic editor content
      return sanitizedInnerHTML ? (
        <div className="wp-block-freeform">{parse(sanitizedInnerHTML)}</div>
      ) : null;

    default:
      // Fallback for unknown blocks
      return sanitizedInnerHTML ? (
        <div className={`wp-block-${blockName?.replace("/", "-")}`}>
          {parse(sanitizedInnerHTML)}
        </div>
      ) : null;
  }
};

// Usage Example
const WordPressPost = ({ post }) => {
  return (
    <article className="wordpress-post">
      <header>
        <h1>{post.title.rendered}</h1>
      </header>

      <div className="post-content">
        <GutenbergRenderer content={post.content.rendered} />
      </div>
    </article>
  );
};

// CSS for basic styling (add this to your CSS file)
const blockStyles = `
.gutenberg-content {
  line-height: 1.6;
}

.wp-block-paragraph {
  margin-bottom: 1em;
}

.wp-block-heading {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.wp-block-image {
  margin: 1em 0;
}

.wp-block-quote {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
}

.wp-block-code {
  background: #f4f4f4;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.wp-block-separator {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2em 0;
}

.wp-block-columns {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}

.wp-block-column {
  flex: 1;
  min-width: 0;
}

.wp-block-group {
  margin: 1em 0;
}

@media (max-width: 768px) {
  .wp-block-columns {
    flex-direction: column;
  }
}
`;

export default GutenbergRenderer;
