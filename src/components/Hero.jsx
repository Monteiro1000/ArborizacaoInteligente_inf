import React from 'react';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <header className="site-header" id="home">
      <Navbar />

      <div className="hero container">
        <div className="hero-copy">
          <span className="hero-status-pill">
            Tecnologia &amp; Meio Ambiente
          </span>
          <h1 className="hero-title">
            Arborização Inteligente
          </h1>
          <p className="lead">
            Arborização Inteligente surge como uma solução inovadora que transforma dados em ação de maneira inteligente. Somos a ferramenta para transformar a qualidade de vida da sua cidade.
          </p>

          <div className="hero-actions">
            <a href="#solucao" className="btn btn-primary">Conhecer a Solução</a>
            <a href="#contato" className="btn btn-outline">Falar com a Equipe</a>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-metric-item">
              <span className="metric-val">IoT</span>
              <span className="metric-lbl">Sensores &amp; Telemetria</span>
            </div>
            <div className="hero-metric-item">
              <span className="metric-val">IA &amp; Drones</span>
              <span className="metric-lbl">Diagnóstico Preventivo</span>
            </div>
            <div className="hero-metric-item">
              <span className="metric-val">ODS ONU</span>
              <span className="metric-lbl">Metas 11, 13 e 15</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
