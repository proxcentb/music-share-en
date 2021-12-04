import WithTooltip from './Tooltip';
import YoutubeEmbed from './YoutubeEmbed';
import { tags as allTags, getTagByName, getModifiedTag } from "./config/tags";
import { getVideosByTags } from "./config/videos";
import { useCallback, useRef, useEffect, useMemo, useState } from "preact/hooks";
import { useTags, usePage, useDidMountEffect, useModal } from "./hooks";
import { memo } from "preact/compat";
import "./style";

function getTagStyles(tagState, initialStyle, initialClassName) {
  switch(tagState) {
    case true: return { className: `tag selected ${initialClassName ?? ''}` };
    case false: return { className: `tag deselected ${initialClassName ?? ''}` };
    default: return {
      style: initialStyle ?? {},
      className: `tag ${initialClassName ?? ''}`,
    }
  }
}

const Tag = ({ name, description, tagState, style: initialStyle, className: initialClassName, ...restProps }) => {
  const { style, className } = getTagStyles(tagState, initialStyle, initialClassName);
  const children = <div {...restProps} style={style} className={className}>{name}</div>;
  return description ? <WithTooltip content={description}>{children}</WithTooltip> : children;
}

const Video = ({ tags, description, embedId, title, renderTag }) => {
  const ref = useRef(null);
  useEffect(() => ref.current.classList.add('visible'), []);
  
  const descriptionNode = useMemo(() => description !== null ? renderTag({...getTagByName('ⓘ'), description}) : <></>, [description, renderTag]);
  const tagsNodes = useMemo(() => tags.map(tag => renderTag(getTagByName(tag))), [tags, renderTag]);
  return (
    <div ref={ref} className="video-wrapper">
      <div className="tags">{[descriptionNode, ...tagsNodes]}</div>
      <YoutubeEmbed embedId={embedId} title={title} />
    </div>
  );
}

const Tags = memo(({ renderTag }) => <div className="tags">{allTags.map(renderTag)}</div>);
const Navigation = memo(({ totalPages, activePage, setPage }) => <div className="navigation">{Array.from({ length: totalPages }, (_, i) => <button className={i + 1 === activePage ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>)}</div>);
const Videos = memo(({ videos, renderTag }) => <div className="videos">{videos.map(video => <Video key={video.embedId} {...video} renderTag={renderTag} />)}</div>)
const Modal = memo(({ closeModal, setSkipIntroTrueToLocalStorage }) => {
  const [ nodes, setNodes ] = useState(null);
  const toggleHighlightNode = useCallback((nodeName) => nodes[nodeName].classList.toggle('above-all'), [nodes]);
  
  useEffect(() => {
    const bodyNode = document.querySelector('body');
    setNodes({ 
      tagsNode: bodyNode.querySelector('.app > .tags'), 
      navigationNode: bodyNode.querySelector('.app > .navigation'),
    });
    
    bodyNode.classList.add('hidden-scroll');
    return () => bodyNode.classList.remove('hidden-scroll');
  }, []);

  const exampleTags = useMemo(() => [
    { name: 'active', description: 'only videos with this tag will show up', tagState: true },
    { name: 'inactive', description: 'all videos with this tag won\'t show up', tagState: false },
    { name: 'neutral', description: 'initial state, doesn\'t affect anything', tagState: null },
  ].map(tag => <Tag {...getModifiedTag(tag)} />), []);
  
  return (
    <div className="modal outlined-text">
      <ol>
        <li><button onClick={() => toggleHighlightNode('navigationNode')}>Pages here</button></li>
        <li><button onClick={() => toggleHighlightNode('tagsNode')}>Tags there</button> (and on all the videos)</li>
        <li>Every tag has 3 states: {exampleTags[0]} {exampleTags[1]} {exampleTags[2]}</li>
        <li>When you hover over a tag, a small description appears.</li>
        <li>You can change the state of the tag with the right or left mouse button.</li>
        <li className="show-small-screen">Not for mobile, go to pc</li>
        <li>Separation into tags is subjective, you don't have to beat the author for it.</li>
        <li>The more I like the music, the first it is on the list (in theory).</li>
        <li>All content is current as of 28 November 2021.</li>
      </ol>
      <div>
        <button onClick={closeModal}>Alright, got it.</button>
        <button className="show-small-screen" onClick={closeModal}>I don't care. Let me in.</button>
        <button onClick={setSkipIntroTrueToLocalStorage}>Stop showing me this!</button>
      </div>
    </div>
  );
})

export default function App() {
  const pageSize = 12;
  const { page, setPage } = usePage();
  const { tags, cycleTagState } = useTags();
  const { shouldShowModal, closeModal, setSkipIntroTrueToLocalStorage } = useModal();

  const videosToDisplay = useMemo(() => getVideosByTags(tags), [tags]);
  const totalPages = useMemo(() => Math.ceil(videosToDisplay.length / pageSize), [pageSize, videosToDisplay.length]);
  const videosToDisplayInPage = useMemo(() => videosToDisplay.filter((_, i) => pageSize * (page - 1) <= i && i < pageSize * page), [page, videosToDisplay]);
  const renderTag = useCallback(tag => {
    const { name } = tag;
    const onContextMenu = (e) => { e.preventDefault(); cycleTagState(name, -1) }
    const onClick = () => cycleTagState(name, 1);
    return <Tag {...tag} key={name} tagState={tags[name]} onClick={onClick} onContextMenu={onContextMenu} />;
  }, [cycleTagState, tags]);

  useDidMountEffect(() => setPage(1), [JSON.stringify(videosToDisplay.map(video => video.embedId))]);
  
  // hack to scroll to top on page load
  useEffect(() => setTimeout(() => window.scrollTo(0, 0), 50), []);

  return (
    <div className="app">
      <div className="background" />
      {shouldShowModal && <Modal closeModal={closeModal} setSkipIntroTrueToLocalStorage={setSkipIntroTrueToLocalStorage} />}
      <Tags renderTag={renderTag} />
      <Navigation totalPages={totalPages} activePage={page} setPage={setPage} />
      <Videos videos={videosToDisplayInPage} renderTag={renderTag} />
    </div>
	);
}
