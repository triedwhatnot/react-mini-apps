/* v8 ignore start */

const Star = ({percColor, index}) => {
    
  return (
    <svg data-id={index} xmlns="http://www.w3.org/2000/svg"  width="256px" height="50px" viewBox="0 0 32 32">
        <defs>
        <linearGradient id={`grad-${index}`}>
            <stop offset={`${percColor}%`} stopColor={percColor ? "yellow" : "white"} stopOpacity="1" />
            <stop offset={`${100-percColor}%`} stopColor="white" stopOpacity="1"/>
        </linearGradient>
        </defs>
        <path fill={`url(#grad-${index})`} d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
    l11.547-1.2L16.026,0.6L20.388,10.918z"/>
    </svg>
  );
};

export default Star;
/* v8 ignore start */
