function createClassStringFunc(classNameProp) {
  return (classNameTypeString) =>
    classNameProp
      ? `${classNameProp} ${classNameTypeString}`
      : classNameTypeString;
}

function Typography({ type, children, className = '' }) {
  const createClassString = createClassStringFunc(className);

  switch (type) {
    case 'title':
      return <h2 className={createClassString('text-4xl')}>{children}</h2>;
    case 'content':
      return (
        <p className={createClassString('text-xl font-light leading-8')}>
          {children}
        </p>
      );
    case 'regular':
      return (
        <p className={createClassString('text-xl font-light')}>{children}</p>
      );
    case 'small':
      return <p className={createClassString('text-lg')}>{children}</p>;
    case 'linkLight':
      return (
        <span className={createClassString('text-xl font-light text-sky-500')}>
          {children}
        </span>
      );
    case 'smallLink':
      return (
        <span className={createClassString('text-lg text-sky-500')}>
          {children}
        </span>
      );
    default:
      return <p className={createClassString('text-xl')}>{children}</p>;
  }
}

export default Typography;
