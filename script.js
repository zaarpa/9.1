const app = Vue.createApp({});

const NameTest = {
  data() {
    return {
      typedName: "",
      nameDisplayMessage: "",
    };
  },
  methods: {
    handleNameInput() {
      const validNameRegex = /^[a-zA-Z\s]*$/;

      if (validNameRegex.test(this.typedName)) {
        this.nameDisplayMessage = `${this.typedName} is a nice name`;
      } else {
        this.nameDisplayMessage = "Please enter a valid name";
      }
    },
  },
  template: `
    <div class="m-5">
      <div class="form-group">
        <h1 class="custom-heading">String Test</h1>
        <label class="name-input" for="nameInput">Enter your name:</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Type here..." v-model="typedName" @input="handleNameInput">
        <div id="nameDisplay" class="name-display">{{ nameDisplayMessage }}</div> <!-- Display area for name -->
      </div>
    </div>
  `,
};

const PostManagement = {
  data() {
    return {
      newTask: "",
      tasks: [], // Array to store tasks
    };
  },
  methods: {
    addTask() {
      const taskName = this.newTask.trim(); // Get task name and trim whitespace

      if (taskName === "") {
        alert("Please enter a task name");
        return;
      }

      this.tasks.push(taskName); // Add task to array
      this.newTask = ""; // Clear input field
    },
    deleteTask(index) {
      this.tasks.splice(index, 1); // Remove task from array
    },
  },
  template: `
  <div class="d-flex flex-column">
  <div class="form-group m-5">
    <label for="taskInput">Enter Task:</label>
    <input type="text" class="form-control" id="taskInput" placeholder="Type task here..." v-model="newTask">
    <button class="btn btn-primary mt-3" @click="addTask">Add Task</button>
  </div>

  <div id="taskList" class="m-5">
    <div v-for="(task, index) in tasks" :key="index" class="task">
      <span>{{ task }}</span>
      <button class="btn btn-danger" @click="deleteTask(index)">Delete</button>
    </div>
    <p v-if="tasks.length === 0" class="text-muted mt-3">No tasks added yet</p>
  </div>
</div>
  
  `,
};
const StudentMarks = {
  data() {
    return {
      students: [
        { name: "John", marks: 85 },
        { name: "Emily", marks: 92 },
        { name: "Michael", marks: 78 },
        { name: "Sophia", marks: 95 },
        { name: "William", marks: 88 },
        { name: "Olivia", marks: 90 },
        { name: "James", marks: 82 },
        { name: "Ava", marks: 89 },
        { name: "Benjamin", marks: 91 },
        { name: "Isabella", marks: 87 },
        { name: "Jacob", marks: 84 },
        { name: "Mia", marks: 93 },
      ],
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    // Calculate total number of pages based on pageSize and total students
    totalPages() {
      return Math.ceil(this.students.length / this.pageSize);
    },
    // Slice students array based on currentPage and pageSize
    paginatedStudents() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.students.slice(startIndex, endIndex);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  template: `
  <div class="d-flex flex-column align-items-center m-5">
    <div>
    <h1 class="custom-heading">Student Marks</h1></div>

    <!-- Student marks table -->
    <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in paginatedStudents" :key="index">
          <td>{{ student.name }}</td>
          <td>{{ student.marks }}</td>
        </tr>
      </tbody>
    </table></div>

    <!-- Pagination Controls (below the table) -->
    <div class="pagination">
      <button class="btn btn-primary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span class="mx-3">{{ currentPage }}</span>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
  `,
};
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/string-test", component: NameTest },
    { path: "/post-management", component: PostManagement },
    { path: "/student-marks", component: StudentMarks },
  ],
});
app.component("App", {
  template: `
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/string-test">NameTest</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/post-management">PostManagement</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/student-marks">StudentMarks</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view></router-view>
    </div>
    `,
});

app.use(router);
// Mount the app on an element with id="app"
app.mount("#app");
