package com.itsm.backend.service;

import com.itsm.backend.model.Ticket;
import com.itsm.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> listarTodos() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> buscarPorId(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket criarTicket(Ticket ticket) {
        ticket.setDataCriacao(LocalDateTime.now());
        ticket.setStatus("ABERTO");

        // Cálculo de SLA com base na prioridade
        long horasSla = 24; // Padrão
        if ("Critica".equalsIgnoreCase(ticket.getPrioridade())) horasSla = 2;
        else if ("Alta".equalsIgnoreCase(ticket.getPrioridade())) horasSla = 8;
        else if ("Media".equalsIgnoreCase(ticket.getPrioridade())) horasSla = 24;
        else if ("Baixa".equalsIgnoreCase(ticket.getPrioridade())) horasSla = 48;

        ticket.setDataLimiteSla(LocalDateTime.now().plusHours(horasSla));
        return ticketRepository.save(ticket);
    }

    public Ticket atualizarStatus(Long id, String status) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket não encontrado"));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    public void deletarTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}