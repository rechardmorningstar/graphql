import { fetchData } from "../fetchData.js";

export const AuditRatio = async (token, query, size = 200) => {
    const lb = document.querySelector('.left-boxe');
  const auditData = await fetchData(token, query);
  const a = auditData.data.data.user[0].totalDown;
  const b = auditData.data.data.user[0].totalUp;

  const auditBox = document.createElement("div");
  auditBox.className = "auditBox";
  auditBox.classList.add('card')
  auditBox.style.border = "2px solid black";
  
  const total = a + b;
  const aPercent = a / total;
  const bPercent = b / total;
    const radius = size / 2 -10;
    const strokeWidth = 20;
    const center = size / 2;
    const aAngle = aPercent * 360;
    const bAngle = bPercent * 360;
    function  getArcPath(startAngle, sweepAngle) {
        const largeArc = sweepAngle > 180 ? 1 : 0;
        const start = polarToCartesian(center, center, radius, startAngle);
        const end = polarToCartesian(center, center, radius, startAngle + sweepAngle);
        return `M${start.x},${start.y} A${radius},${radius} 0 ${largeArc},1 ${end.x},${end.y}`;
    }
    function polarToCartesian(cx, cy, r, angleDeg) {
        const angleRad = (angleDeg - 90) * Math.PI / 180.0;
        return {
            x: cx + r * Math.cos(angleRad),
            y: cy + r * Math.sin(angleRad),
        };
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    const aPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    aPath.setAttribute('d', getArcPath(0, aAngle));
    aPath.setAttribute('stroke', '#0a0a0a');
    aPath.setAttribute('stroke-width', strokeWidth);
    aPath.setAttribute('fill', 'none');
    svg.appendChild(aPath);
    const bPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bPath.setAttribute('d', getArcPath(aAngle, bAngle));
    bPath.setAttribute('stroke', '#d3d3d3');
    bPath.setAttribute('stroke-width', strokeWidth);
    bPath.setAttribute('fill', 'none');
    svg.appendChild(bPath);
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', center);
    centerCircle.setAttribute('cy', center);
    centerCircle.setAttribute('r', radius - strokeWidth);
    svg.appendChild(centerCircle);
    
    const ratio = String(auditData.data.data.user[0].auditRatio).slice(0,3)
    const ratioText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ratioText.textContent = `${ratio}`;
    ratioText.setAttribute('x', center);
    ratioText.setAttribute('y', center);
    ratioText.setAttribute('fill', '#ffffff');
    ratioText.setAttribute('text-anchor', 'middle');
    ratioText.setAttribute('alignment-baseline', 'middle');
    svg.appendChild(ratioText);
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.background = 'rgba(0, 0, 0, 0.75)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    document.body.appendChild(tooltip);
    aPath.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.textContent = `Given: ${byteToM(a)}`;
    });
    bPath.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.textContent = `Received: ${byteToM(b)}`;
    });
    aPath.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    bPath.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    svg.addEventListener('mousemove', (event) => {
        const offsetX = event.clientX + 10;
        const offsetY = event.clientY + window.scrollY - 20;
        tooltip.style.left = `${offsetX}px`;
        tooltip.style.top = `${offsetY}px`;
    });

    auditBox.appendChild(svg)
    lb.appendChild(auditBox);
}

function byteToM(n){
    if (n < 1000){
      return String(n)+' B'
    } else if (n < 1000000){
      return String(n/1000) + ' K'
    } else {
      return String(n/1000000) + ' M'
    }
  }