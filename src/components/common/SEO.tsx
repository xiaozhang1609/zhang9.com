import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { categories } from '../../config/tools';

interface SEOProps {
  toolId?: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
}

export default function SEO({ 
  toolId,
  customTitle,
  customDescription,
  customKeywords
}: SEOProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const title = customTitle || t(toolId || 'toolbox');
  const description = customDescription || t(`${toolId}Desc` || 'toolboxDesc');
  
  const keywords = [
    customKeywords,
    title,
    '在线工具',
    '免费工具',
    '章九工具箱',
    ...Object.values(categories)
  ].filter(Boolean).join(',');

  const canonicalUrl = `https://tools.itxiaozhang.com${location.pathname}`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{`${title} - 章九工具箱`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="章九工具箱" />
      <meta property="og:locale" content={i18n.language === 'zh' ? 'zh_CN' : 'en_US'} />

      <link rel="canonical" href={canonicalUrl} />
      
      <meta name="baidu-site-verification" content="verification-code" />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title,
          "description": description,
          "url": canonicalUrl,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CNY"
          }
        })}
      </script>
    </Helmet>
  );
}