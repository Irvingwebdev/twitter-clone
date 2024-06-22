import React from 'react';

function Videos() {
  const links = [
    {src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2121570501549207%2F&show_text=false&width=267&t=0"},
    {src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1833973900455384%2F&show_text=true&width=267&t=0" },
    {src:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1901887466929566%2F&show_text=false&width=267&t=0"},
    {src:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F61558393556724%2Fvideos%2F3751265975163081%2F&show_text=false&width=267&t=0"},
    {src:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1003857884706596%2F&show_text=false&width=267&t=0"},
    {src:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1174562113788015%2F&show_text=false&width=267&t=0"}
  ];

  const estilo = {
    border: 'none',
    overflow: 'hidden',
    width: '267px',
    height: '476px',
  };

  

  return (
    <div className='flex mx-auto justify-center w-full  '>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full '>
        {links.map((valor, index) => (
          <iframe
            key={index}
            src={valor.src}
            style={estilo}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className='m-auto'
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default Videos;
