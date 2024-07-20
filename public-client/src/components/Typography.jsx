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
      return (
        <h2 className={createClassString('text-4xl leading-snug')}>
          {children}
        </h2>
      );
    case 'smallTitle':
      return <h2 className={createClassString('text-2xl')}>{children}</h2>;
    case 'contentSummary':
      return (
        <p
          className={createClassString(
            'line-clamp-2 overflow-hidden text-ellipsis text-xl font-light leading-8'
          )}>
          {children}
        </p>
      );
    case 'contentFull':
      return (
        <p
          className={createClassString(
            'whitespace-break-spaces text-xl font-light leading-10'
          )}>
          {children}
        </p>
      );
    case 'regular':
      return (
        <span className={createClassString('text-xl font-light')}>
          {children}
        </span>
      );
    case 'small':
      return <span className={createClassString('text-lg')}>{children}</span>;
    case 'smallerLight':
      return (
        <span className={createClassString('text-lg font-light')}>
          {children}
        </span>
      );
    case 'smaller':
      return <span className={createClassString('text-base')}>{children}</span>;

    case 'smallerBold':
      return (
        <span className={createClassString('text-base font-bold')}>
          {children}
        </span>
      );
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
