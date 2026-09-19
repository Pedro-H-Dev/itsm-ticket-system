package com.itsm.backend.controller;

import com.itsm.backend.model.Ticket;
import com.itsm.backend.repository.TicketRepository;
import com.itsm.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping
    public List<Ticket> listarTodos() {
        return ticketService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> buscarPorId(@PathVariable Long id) {
        return ticketService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Ticket criarTicket(@RequestBody Ticket ticket) {
        return ticketService.criarTicket(ticket);
    }

    @PutMapping("/{id}/status")
    public Ticket atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        return ticketService.atualizarStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTicket(@PathVariable Long id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}