package com.itsm.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, length = 1000)
    private String descricao;

    @Column(nullable = false)
    private String categoria; // ex: Rede, Hardware, Software

    @Column(nullable = false)
    private String prioridade; // ex: Baixa, Media, Alta, Critica

    @Column(nullable = false)
    private String status; // ex: ABERTO, EM_ANDAMENTO, RESOLVIDO

    private String tecnicoResponsavel;

    private LocalDateTime dataCriacao;
    private LocalDateTime dataLimiteSla;

    @PrePersist
    protected void onCreate() {
        this.dataCriacao = LocalDateTime.now();
        if (this.status == null) {
            this.status = "ABERTO";
        }
    }
}