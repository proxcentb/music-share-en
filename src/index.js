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
    { name: 'активное', description: 'только видео с этим тегом будут появляться', tagState: true },
    { name: 'неактивное', description: 'все видео с такими тегом не будут появляться', tagState: false },
    { name: 'нейтральное', description: 'изначальное состояние, не влияет на что-либо', tagState: null },
  ].map(tag => <Tag {...getModifiedTag(tag)} />), []);
  
  return (
    <div className="modal outlined-text">
      <ol>
        <li><button onClick={() => toggleHighlightNode('navigationNode')}>Тут страницы</button></li>
        <li><button onClick={() => toggleHighlightNode('tagsNode')}>Там теги</button> (и на всех видео тоже)</li>
        <li>У каждого тега есть 3 состояния: {exampleTags[0]} {exampleTags[1]} {exampleTags[2]}</li>
        <li>При наведении курсора на тег появляется небольшое описание.</li>
        <li>Можете менять состояние тега правой или левой кнопкой мыши.</li>
        <li className="show-small-screen">Под мобилу не заточено, идите за пк</li>
        <li>Разделение на теги субъективно, не надо бить автора за это.</li>
        <li>Чем больше музыка мне нравится, тем первее она в списке (по идее).</li>
        <li>Весь контент актуален на 28 ноября 2021.</li>
      </ol>
      <div>
        <button onClick={closeModal}>Понял, принял.</button>
        <button className="show-small-screen" onClick={closeModal}>Да мне вообще плевать.</button>
        <button onClick={setSkipIntroTrueToLocalStorage}>Хватит показывать это сообщение!</button>
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
