const Footer = () => {
  const year = new Date().getFullYear();

  return <div className="footer">{`Copyright © BuiHuy ${year}`}</div>;
};

export default Footer;
