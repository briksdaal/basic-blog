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
        <h2 className={createClassString('text-3xl leading-snug sm:text-4xl')}>
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
        <span className={createClassString('text-xl font-light text-sky-800')}>
          {children}
        </span>
      );
    case 'smallLink':
      return (
        <span className={createClassString('text-lg text-sky-800')}>
          {children}
        </span>
      );
    case 'smallerLink':
      return (
        <span className={createClassString('text-base text-sky-800')}>
          {children}
        </span>
      );
    case 'link':
      return (
        <span className={createClassString('text-xl text-sky-800')}>
          {children}
        </span>
      );
    default:
      return <span className={createClassString('text-xl')}>{children}</span>;
  }
}

export default Typography;
