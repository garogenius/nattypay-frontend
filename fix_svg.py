import glob

svg_replacement = """                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4"/>
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04"/>
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335"/>
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853"/>
                  </svg>"""

mobile_svg_replacement = """                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4"/>
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04"/>
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335"/>
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853"/>
                  </svg>"""

download_svg_replacement = """                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
                      <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4"/>
                      <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04"/>
                      <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335"/>
                      <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853"/>
                    </svg>"""

for file in glob.glob('src/features/landing/components/*HeroSection.tsx') + ['src/features/landing/components/HeroSection.tsx']:
    with open(file, 'r') as f:
        content = f.read()
    
    # Desktop
    import re
    desktop_pattern = r'<svg width="28" height="28" viewBox="0 0 24 24">\s*<path d="M3\.18[^>]+>\s*<path d="M20\.49[^>]+>\s*<path d="M3\.28[^>]+>\s*<path d="M3\.18[^>]+>\s*</svg>'
    content = re.sub(desktop_pattern, svg_replacement, content)
    
    # Mobile
    mobile_pattern = r'<svg width="22" height="22" viewBox="0 0 24 24" className="flex-shrink-0">\s*<path d="M3\.18[^>]+>\s*<path d="M20\.49[^>]+>\s*<path d="M3\.28[^>]+>\s*<path d="M3\.18[^>]+>\s*</svg>'
    content = re.sub(mobile_pattern, mobile_svg_replacement, content)

    with open(file, 'w') as f:
        f.write(content)

# Download Section
with open('src/features/landing/components/DownloadSection.tsx', 'r') as f:
    content = f.read()

dl_pattern = r'<svg className="w-\[18px\] h-\[18px\]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\s*<path d="M3\.5[^>]+>\s*<path d="M19\.7[^>]+>\s*<path d="M15\.65[^>]+>\s*<path d="M15\.65[^>]+>\s*</svg>'
content = re.sub(dl_pattern, download_svg_replacement, content)

with open('src/features/landing/components/DownloadSection.tsx', 'w') as f:
    f.write(content)

