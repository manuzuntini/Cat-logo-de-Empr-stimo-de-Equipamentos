const { createApp, ref, reactive, computed, watch, nextTick } = Vue;

createApp({
  setup() {
    // Estado principal
    const equipamentos = ref([]);
    const triedSubmit = ref(false);
    const isEditing = ref(false);
    const editingId = ref(null);

    // Formulário
    const form = reactive({
      nome: '',
      categoria: '',
      patrimonio: '',
      status: ''
    });

    // Refs para acessibilidade/foco
    const nomeInput = ref(null);

    // Filtros
    const filtros = reactive({
      categoria: '',
      status: ''
    });

    // --- Persistência ---
    const STORAGE_KEY = 'catalogo_equipamentos_lab_v1';
    const carregar = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        equipamentos.value = raw ? JSON.parse(raw) : [];
      } catch (e) {
        equipamentos.value = [];
      }
    };
    const salvar = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos.value));
    };
    carregar();
    watch(equipamentos, salvar, { deep: true });

    // --- Computed ---
    const total = computed(() => equipamentos.value.length);
    const totalDisponiveis = computed(() => equipamentos.value.filter(e => e.status === 'disponível').length);
    const totalEmprestados = computed(() => equipamentos.value.filter(e => e.status === 'emprestado').length);

    const opcoesCategorias = computed(() => {
      const set = new Set(equipamentos.value.map(e => e.categoria).filter(Boolean));
      return Array.from(set).sort((a,b)=>a.localeCompare(b));
    });
    const sugestoesCategorias = computed(() => opcoesCategorias.value);

    const listaFiltrada = computed(() => {
      return equipamentos.value.filter(e => {
        const catOk = !filtros.categoria || e.categoria === filtros.categoria;
        const statusOk = !filtros.status || e.status === filtros.status;
        return catOk && statusOk;
      });
    });

    // Validação simples
    const formValido = computed(() => !!(form.nome && form.categoria && form.patrimonio && form.status));

    // Helpers
    const resetForm = () => {
      form.nome = '';
      form.categoria = '';
      form.patrimonio = '';
      form.status = '';
      isEditing.value = false;
      editingId.value = null;
      triedSubmit.value = false;
      nextTick(() => nomeInput.value?.focus());
    };

    const gerarId = () => Math.floor(Date.now() + Math.random() * 1000);

    const addOrSave = () => {
      triedSubmit.value = true;
      if (!formValido.value) return;

      if (isEditing.value && editingId.value != null) {
        // Update
        const idx = equipamentos.value.findIndex(e => e.id === editingId.value);
        if (idx !== -1) {
          equipamentos.value[idx] = { id: editingId.value, ...form };
        }
        resetForm();
      } else {
        // Create
        const novo = { id: gerarId(), ...form };
        equipamentos.value.unshift(novo);
        resetForm();
      }
    };

    const editar = (item) => {
      isEditing.value = true;
      editingId.value = item.id;
      form.nome = item.nome;
      form.categoria = item.categoria;
      form.patrimonio = item.patrimonio;
      form.status = item.status;
      nextTick(() => nomeInput.value?.focus());
    };

    const remover = (item) => {
      const ok = window.confirm(`Remover "${item.nome}"?`);
      if (!ok) return;
      equipamentos.value = equipamentos.value.filter(e => e.id !== item.id);
      if (isEditing.value && editingId.value === item.id) {
        resetForm();
      }
    };

    const limparFiltros = () => {
      filtros.categoria = '';
      filtros.status = '';
    };

    return {
      // estado
      equipamentos,
      form,
      filtros,
      triedSubmit,
      isEditing,
      // refs
      nomeInput,
      // computed
      total,
      totalDisponiveis,
      totalEmprestados,
      opcoesCategorias,
      sugestoesCategorias,
      listaFiltrada,
      formValido,
      // métodos
      addOrSave,
      editar,
      remover,
      resetForm,
      limparFiltros,
    };
  }
}).mount('#app');
